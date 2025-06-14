//below code information https://chatgpt.com/c/67dbef8a-1644-8002-8985-6a88982368a6

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <DHT.h> // Include DHT library

// Wi-Fi credentials
const char* ssid = "realme 11x 5G"; // Replace with your Wi-Fi SSID
const char* password = "9322440198"; // Replace with your Wi-Fi password

// Backend server URL
const char* serverUrl = "http://192.168.107.16:5000('/api/sensors/data"; // Replace with your backend server IP

// Sensor pins
const int moisturePin = A0; // Soil moisture sensor connected to A0
const int pumpPin = D1;     // Relay connected to D1
#define DHTPIN D4           // DHT sensor connected to D4
#define DHTTYPE DHT11       // DHT 11 (use DHT22 if you have that)

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);

WiFiClient client;
HTTPClient http;

void setup() {
  Serial.begin(115200);
  pinMode(pumpPin, OUTPUT);
  digitalWrite(pumpPin, LOW); // Initially turn pump OFF

  // Initialize DHT sensor
  dht.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("IP Address: " + WiFi.localIP().toString()); // Print the IP address
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Read moisture value
    int moistureValue = analogRead(moisturePin);
    int moisturePercent = map(moistureValue, 0, 1023, 100, 0); // Inverted mapping
    Serial.println("Moisture: " + String(moisturePercent) + "%");

    // Read temperature and humidity from DHT sensor
    float temperature = dht.readTemperature(); // Read temperature in Celsius
    float humidity = dht.readHumidity();      // Read humidity in percentage

    // Check if any reads failed
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      temperature = 25.0; // Fallback values
      humidity = 60.0;
    }

    // Print temperature and humidity to Serial Monitor
    Serial.println("Temperature: " + String(temperature) + "°C");
    Serial.println("Humidity: " + String(humidity) + "%");

    // Send moisture, temperature, and humidity data to backend
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"moisture\":" + String(moisturePercent) + 
                     ",\"temperature\":" + String(temperature) + 
                     ",\"humidity\":" + String(humidity) + "}";
    Serial.println("Sending payload: " + payload);
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      Serial.println("Data sent to server. Response code: " + String(httpResponseCode));
      Serial.println("Response body: " + http.getString()); // Print the response body
    } else {
      Serial.println("Error sending data to server. Response code: " + String(httpResponseCode));
    }
    http.end();

    // Fetch pump state from backend
    http.begin(client, "http://192.168.107.16:5000/api/pump/pump"); // Replace with your backend server IP
    int httpCode = http.GET();
    if (httpCode == 200) {
      String response = http.getString();
      Serial.println("Received pump state: " + response);
      StaticJsonDocument<200> doc;
      deserializeJson(doc, response);
      bool pumpState = doc["state"];
      digitalWrite(pumpPin, pumpState ? HIGH : LOW);
      Serial.println("Pump state set to: " + String(pumpState ? "ON" : "OFF"));
    } else {
      Serial.println("Error fetching pump state. Response code: " + String(httpCode));
    }
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
  delay(5000); // Send data every 5 seconds
}
# 🌾 Smart Farming: AI & IoT Powered Agriculture Solution

## 🧠 About the Project

**Smart Farming** is an intelligent agriculture solution that leverages **MERN Stack (MongoDB, Express.js, React.js, Node.js)**, **AI using Flask**, and **IoT devices** like NodeMCU and sensors to help farmers:

- Monitor **real-time environmental conditions**
- **Predict plant diseases** using sensor history and AI-based image classification
- Get **fertilizer and medicine suggestions**
- View **price predictions** for plants based on market and condition analysis

This project is built to increase productivity, reduce losses, and empower farmers with accessible technology.

---

## 📦 Tech Stack

### 🔧 Frontend
- React.js
- Axios
- Chart.js (or Recharts) for live sensor graph

### 🖥 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT) for Authentication

### 🧠 AI Model
- **Flask** for hosting a TensorFlow/Keras model
- CNN model trained on **potato leaf diseases**
- Deployed on a separate Flask server

### 🌐 Hardware Integration (IoT)
- NodeMCU (ESP8266)
- Moisture Sensor
- DHT11 for Temperature & Humidity
- Data sent to backend via REST API using HTTP requests

---

## 🔑 Features

### 🌱 Sensor Dashboard
- Live monitoring of:
  - Soil Moisture
  - Temperature
  - Humidity
- Trend visualization using graphs

### 🧬 Disease Detection
- **From Sensor History:** Detect potential disease outbreaks using thresholds and historical anomalies.
- **From Image Upload:** Upload leaf images to detect disease using AI Flask model.

### 💊 Fertilizer & Medicine Suggestion
- Based on detected disease, crop type, and environmental data, show:
  - Suitable Fertilizers
  - Disease control medicines

### 💰 Price Prediction
- Predict plant pricing using:
  - Crop type
  - Region
  - Market trends
  - Disease status

---

## 🔌 Hardware Setup

- Connect NodeMCU to:
  - Moisture sensor**
  - DHT11 sensor**
- Program it to send data to Express backend every few seconds/minutes
- Data is stored in MongoDB and visualized on frontend


###Setup Frontend
- cd frontend
- npm install
- npm run dev

###Setup Backend
- cd backend
- npm install
- node app.js

npm start
###Setup Flask AI model
- cd ai-model
- pip install -r requirements.txt
- python app.py


###Hardware connection diagram
![image](https://github.com/user-attachments/assets/cad437da-026a-475a-a95b-27820747472e)






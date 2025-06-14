const SensorData = require('../models/sensorModel');
// const twilio = require('twilio');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.postSensorData = async (req, res) => {
  const { moisture, temperature, humidity } = req.body;
  const data = new SensorData({ moisture, temperature, humidity });

  try {
    await data.save();

    // if (moisture < 30) {
    //   client.messages.create({
    //     body: `Warning! Soil moisture is low: ${moisture}%. Temperature: ${temperature}°C, Humidity: ${humidity}%. Consider turning on the pump.`,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: process.env.RECIPIENT_PHONE_NUMBER,
    //   }).then(() => console.log("SMS sent: Low moisture warning."));
    // }

    res.status(200).send("Sensor data received");
  } catch (error) {
    res.status(500).send("Error saving sensor data");
  }
};

exports.getSensorData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(3);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensor data' });
  }
};

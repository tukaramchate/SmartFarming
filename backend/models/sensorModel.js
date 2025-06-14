const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  moisture: Number,
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;

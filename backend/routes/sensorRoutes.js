const express = require('express');
const router = express.Router();
const { postSensorData, getSensorData } = require('../controllers/sensorController');

router.post('/data', postSensorData);
router.get('/data', getSensorData);

module.exports = router;

const express = require('express');
const router = express.Router();
const { controlPump, getPumpState } = require('../controllers/pumpController');

router.post('/pump', controlPump);
router.get('/pump', getPumpState);

module.exports = router;

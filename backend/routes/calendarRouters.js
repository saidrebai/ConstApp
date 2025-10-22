const express = require('express');
const router = express.Router();
const calendarCtrl = require('../Controllers/calendarControlles');

router.get('/available-times', calendarCtrl.getAvailableTimes);
router.post('/book', calendarCtrl.bookTime);

module.exports = router;
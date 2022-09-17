const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.post('/', reminderController.sendReminder, (req, res) => {
  res.sendStatus(200);
});
module.exports = router;

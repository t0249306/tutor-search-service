const express = require('express');
const router = express.Router();
const { Booking } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { tutorId, studentName, contact, time } = req.body;
    const booking = await Booking.create({
      TutorId: tutorId,
      studentName,
      contact,
      time
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
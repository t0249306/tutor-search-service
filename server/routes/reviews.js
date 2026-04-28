const express = require('express');
const router = express.Router();
const { Review } = require('../models');

router.get('/:tutorId', async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { TutorId: req.params.tutorId } });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:tutorId', async (req, res) => {
  try {
    const { author, text } = req.body;
    const review = await Review.create({
      author,
      text,
      TutorId: req.params.tutorId
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
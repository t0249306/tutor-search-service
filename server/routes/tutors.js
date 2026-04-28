const express = require('express');
const router = express.Router();
const { Tutor } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { subject } = req.query;
    const where = {};
    if (subject) {
      where.subject = { [Op.like]: `%${subject}%` };
    }
    const tutors = await Tutor.findAll({ where });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
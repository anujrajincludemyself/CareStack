const express = require("express");
const router = express.Router();
const Patient = require('../models/Patient');

// GET all patients
router.get('/', async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADD patient
router.post('/add', async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const existing = await Patient.findOne({ name, age, gender });
    if (existing) {
      return res.status(409).json({ message: 'patient already exists' });
    }

    const newPatient = new Patient({ name, age, gender });
    await newPatient.save();

    res.status(201).json({
      message: 'Patient added successfully',
      patient: newPatient
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE patient
router.put('/update/:id', async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, age, gender },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Patient updated successfully',
      patient: updatedPatient
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE patient
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


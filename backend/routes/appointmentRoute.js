const express = require('express');

const router = express.Router();
const Appointment = require('../models/Appointment')

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { patientname, doctorname, date } = req.body;

    // check if appointment already exists
    const existingAppointment = await Appointment.findOne({
      patientname,
      doctorname,
      date
    });
//we cheacked here for appontments
    if (existingAppointment) {
      return res.status(409).json({
        message: 'Appointment already exists'
      });
    }

    // create new appointment
    const newAppointment = new Appointment({
      patientname,
      doctorname,
      date
    });

    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment added successfully',
      appointment: newAppointment
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// UPDATE appointment
router.put('/update/:id', async (req, res) => {
  try {
    const { patientname, doctorname, date } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { patientname, doctorname, date },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE appointment
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment deleted successfully'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router
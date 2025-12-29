const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const patientsRoute = require('./routes/patientRoute');
const doctorsRoute = require('./routes/doctorRoute');
const appointmentRoute = require('./routes/appointmentRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB (optional)
const mongoURL = process.env.MONGOURL;

if (mongoURL) {
  mongoose.connect(mongoURL, {
  });

  const db = mongoose.connection;

  db.on('connected', () => console.log('MongoDB connected'));
  db.on('error', err => console.log('MongoDB error:', err));
  db.on('disconnected', () => console.log('MongoDB disconnected'));

} else {
  console.log(' MONGOURL not found — server running without database');
}

// Routes
app.use('/patient', patientsRoute);
app.use('/doctor', doctorsRoute);
app.use('/appointments', appointmentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://care-stack.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const patientsRoute = require('./routes/patientRoute');
const doctorsRoute = require('./routes/doctorRoute');
const appointmentRoute = require('./routes/appointmentRoute');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB
const mongoURL = process.env.MONGOURL;

if (mongoURL) {
  mongoose.connect(mongoURL);

  const db = mongoose.connection;
  db.on('connected', () => console.log('MongoDB connected'));
  db.on('error', err => console.log('MongoDB error:', err));
  db.on('disconnected', () => console.log('MongoDB disconnected'));
} else {
  console.log('MONGOURL not found — server running without database');
}

// Routes
app.use('/patient', patientsRoute);
app.use('/doctor', doctorsRoute);
app.use('/appointments', appointmentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

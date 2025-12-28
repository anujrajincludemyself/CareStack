const { default: mongoose } = require("mongoose");

const patientchema =new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    // Add more fields as needed
});

const Patient = mongoose.model('Patient',patientchema)
module.exports = Patient
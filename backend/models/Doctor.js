const { default: mongoose } = require("mongoose");

const doctorschema =new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    // Add more fields as needed
});

const Doctor = mongoose.model('Doctor',doctorschema)
module.exports = Doctor
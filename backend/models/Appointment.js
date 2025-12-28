const { default: mongoose } = require("mongoose");

const appointementschema = mongoose.Schema({
    patientname :{
        type:String,
        require:true},
    doctorname:{
        type:String,
        require:true
    },
    date: { type: Date, required: true },
})

const appointment = mongoose.model('appointement',appointementschema)
module.exports= appointment
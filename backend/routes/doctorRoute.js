const express = require('express')
const router = express.Router()
const Doctor = require('../models/Doctor')
const mongoose = require('mongoose')

router.get('/',async(req,res)=>{
try {
    const doctor = await Doctor.find()
   res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/add',async(req,res)=>{
    try {
    const {name , specialty}= req.body

    const existing = await Doctor.findOne({
    name , specialty
    })

    if(existing){
         return res.status(409).json({
        message: 'Doctor already exists'
      });
    }

    const newDoctor = new Doctor({name , specialty})
    await newDoctor.save()
  res.status(201).json({
  message: 'Doctor added successfully',
  doctor: newDoctor
});
        
    } catch (err) {
    res.status(500).json({
    error: err.message
    });
    }
})

router.put('/update/:id',async(req,res)=>{
   try{ 
    const {name , specialty} = req.body
    const findDoc = await Doctor.findByIdAndUpdate(
        req.params.id ,
        {name , specialty},
        { new: true, runValidators: true }
    )
    if (!findDoc) {
      return res.status(404).json('Doctor not found');
    }

    res.json('Doctor updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// DELETE doctor
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    //  validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    const doc = await Doctor.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({
      message: 'Doctor deleted successfully',
      doctor: doc
    });

  } catch (err) {
    console.error('Delete doctor error:', err);
    res.status(500).json({ error: err.message }); // ✅ 500, NOT 400
  }
});


module.exports = router
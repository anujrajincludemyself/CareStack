import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientCard from './PatientCard';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get('https://carestack.onrender.com/patient')
      .then(response => setPatients(response.data))
      .catch(error =>
        console.error('Error fetching patients:', error)
      );
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();

    axios
      .post('https://carestack.onrender.com/patient/add', newPatient)
      .then(response => {
        setPatients([...patients, response.data]);
        setNewPatient({ name: '', age: '', gender: '' });
      })
      .catch(error =>
        console.error('Error adding patient:', error)
      );
  };

  const handleUpdatePatient = (id, e) => {
    e.preventDefault();

    axios
      .put(
        `https://carestack.onrender.com/patient/update/${id}`,
        selectedPatient
      )
      .then(() => {
        const updatePat = { ...selectedPatient, _id: id };

        setPatients(
          patients.map(patient =>
            patient._id === id ? updatePat : patient
          )
        );

        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch(error =>
        console.error('Error updating patient:', error)
      );
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(`https://carestack.onrender.com/patient/delete/${id}`)
      .then(() => {
        setSelectedPatient(null);
        setPatients(
          patients.filter(patient => patient._id !== id)
        );
      })
      .catch(error =>
        console.error('Error deleting patient:', error)
      );
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Form Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-5 text-blue-600">
          {isEditMode ? 'Edit Patient' : 'Add New Patient'}
        </h4>

        <form
          onSubmit={
            isEditMode
              ? (e) =>
                  handleUpdatePatient(
                    selectedPatient._id,
                    e
                  )
              : handleAddPatient
          }
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedPatient.name
                  : newPatient.name
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      name: e.target.value
                    })
                  : setNewPatient({
                      ...newPatient,
                      name: e.target.value
                    })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Age
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedPatient.age
                  : newPatient.age
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      age: e.target.value
                    })
                  : setNewPatient({
                      ...newPatient,
                      age: e.target.value
                    })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Gender
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedPatient.gender
                  : newPatient.gender
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      gender: e.target.value
                    })
                  : setNewPatient({
                      ...newPatient,
                      gender: e.target.value
                    })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            {isEditMode ? 'Update Patient' : 'Save Patient'}
          </button>
        </form>
      </div>

      {/* Patients List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-5 text-center text-gray-700">
          Patients ({patients.length})
        </h3>

        <div className="space-y-4">
          {patients.map(patient => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Patients;

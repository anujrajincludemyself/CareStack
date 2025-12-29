import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: ''
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get('https://carestack.onrender.com/doctor')
      .then(response => setDoctors(response.data))
      .catch(error =>
        console.error('Error fetching doctors:', error)
      );
  }, []);

  const handleAddDoctor = (e) => {
    e.preventDefault();

    axios
      .post('https://carestack.onrender.com/doctor/add', newDoctor)
      .then(response => {
        setDoctors([...doctors, response.data]);
        setNewDoctor({ name: '', specialty: '' });
      })
      .catch(error =>
        console.error('Error adding doctor:', error)
      );
  };

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault();

    axios
      .put(`https://carestack.onrender.com/doctor/update/${id}`, selectedDoctor)
      .then(() => {
        const updateDoc = { ...selectedDoctor, _id: id };

        setDoctors(
          doctors.map(doctor =>
            doctor._id === id ? updateDoc : doctor
          )
        );

        setSelectedDoctor(null);
        setIsEditMode(false);
      })
      .catch(error =>
        console.error('Error updating doctor:', error)
      );
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`https://carestack.onrender.com/doctor/delete/${id}`)
      .then(() => {
        setDoctors(
          doctors.filter(doctor => doctor._id !== id)
        );
      })
      .catch(error =>
        console.error('Error deleting doctor:', error)
      );
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Form Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-5 text-blue-600">
          {isEditMode ? 'Edit Doctor' : 'Add New Doctor'}
        </h4>

        <form
          onSubmit={
            isEditMode
              ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
              : handleAddDoctor
          }
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedDoctor.name
                  : newDoctor.name
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      name: e.target.value
                    })
                  : setNewDoctor({
                      ...newDoctor,
                      name: e.target.value
                    })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Specialty
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedDoctor.specialty
                  : newDoctor.specialty
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      specialty: e.target.value
                    })
                  : setNewDoctor({
                      ...newDoctor,
                      specialty: e.target.value
                    })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            {isEditMode ? 'Update Doctor' : 'Save Doctor'}
          </button>
        </form>
      </div>

      {/* Doctors List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-5 text-gray-700">
          Doctors ({doctors.length})
        </h3>

        <div className="space-y-4">
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Doctors;

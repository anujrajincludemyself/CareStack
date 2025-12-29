import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientname: '',
    doctorname: '',
    date: ''
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get('https://carestack.onrender.com/appointments')
      .then(response => setAppointments(response.data))
      .catch(error =>
        console.error('Error fetching appointments:', error)
      );
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();

    axios
      .post('https://carestack.onrender.com/appointments/add', newAppointment)
      .then(response => {
        setAppointments([...appointments, response.data]);
        setNewAppointment({
          patientname: '',
          doctorname: '',
          date: ''
        });
      })
      .catch(error =>
        console.error('Error adding appointment:', error)
      );
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();

    axios
      .put(
        `https://carestack.onrender.com/appointments/update/${id}`,
        selectedAppointment
      )
      .then(() => {
        const updateApp = { ...selectedAppointment, _id: id };

        setAppointments(
          appointments.map(appointment =>
            appointment._id === id ? updateApp : appointment
          )
        );

        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch(error =>
        console.error('Error updating appointments:', error)
      );
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`https://carestack.onrender.com/appointments/delete/${id}`)
      .then(() => {
        setAppointments(
          appointments.filter(
            appointment => appointment._id !== id
          )
        );
      })
      .catch(error =>
        console.error('Error deleting appointment:', error)
      );
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Form Section */}
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-5 text-blue-600">
          {isEditMode ? 'Edit Appointment' : 'Book New Appointment'}
        </h4>

        <form
          onSubmit={
            isEditMode
              ? (e) =>
                  handleUpdateAppointment(
                    selectedAppointment._id,
                    e
                  )
              : handleAddAppointment
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
                  ? selectedAppointment.patientname
                  : newAppointment.patientname
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      patientname: e.target.value
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      patientname: e.target.value
                    })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedAppointment.doctorname
                  : newAppointment.doctorname
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      doctorname: e.target.value
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      doctorname: e.target.value
                    })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={
                isEditMode
                  ? selectedAppointment.date
                  : newAppointment.date
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      date: e.target.value
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      date: e.target.value
                    })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            {isEditMode ? 'Update Appointment' : 'Save Appointment'}
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-5 text-gray-700">
          Appointments ({appointments.length})
        </h3>

        <div className="space-y-4">
          {appointments.map(appointment => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Appointments;

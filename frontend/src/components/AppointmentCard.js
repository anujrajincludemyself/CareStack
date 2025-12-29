import React from 'react';

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md flex flex-col gap-2 hover:shadow-lg transition">
      
      <p className="text-sm">
        <span className="text-gray-500">Patient: </span>
        <span className="text-gray-800 font-semibold">
          {appointment.patientname}
        </span>
      </p>

      <p className="text-sm">
        <span className="text-gray-500">Doctor: </span>
        <span className="text-gray-800 font-semibold">
          {appointment.doctorname}
        </span>
      </p>

      <p className="text-sm">
        <span className="text-gray-500">Date: </span>
        <span className="text-gray-700">
          {new Date(appointment.date).toLocaleDateString()}
        </span>
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(appointment)}
          className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(appointment._id)}
          className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;

import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md flex items-center justify-between hover:shadow-lg transition">
      
      <p className="text-sm">
        <span className="text-gray-800 font-semibold">
          {doctor.name}
        </span>
        <span className="text-gray-500">
          {' '}— {doctor.specialty}
        </span>
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(doctor)}
          className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(doctor.id)}
          className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;

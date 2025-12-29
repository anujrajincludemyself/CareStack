import React from 'react';

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md flex flex-col gap-2 hover:shadow-lg transition">
      
      <h4 className="text-lg font-semibold text-gray-800">
        {patient.name}
      </h4>

      <p className="text-sm">
        <span className="text-gray-500">Age: </span>
        <span className="text-gray-700">{patient.age}</span>
      </p>

      <p className="text-sm">
        <span className="text-gray-500">Gender: </span>
        <span className="text-gray-700">{patient.gender}</span>
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(patient)}
          className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(patient._id)}
          className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;

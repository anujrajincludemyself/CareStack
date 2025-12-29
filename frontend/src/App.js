import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';

const App = () => {
  const isLinkActive = (path) => window.location.pathname === path;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 px-8 py-6">

     
        <div className="text-sm font-extrabold select-none">
          <span className="
            bg-gradient-to-r 
            from-purple-500 
            via-pink-500 
            to-orange-400
            bg-clip-text 
            text-transparent
            drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]
            hover:scale-105
            transition-transform
            cursor-default
          ">
            Developed by Anuj Raj
          </span>
        </div>

        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          CareStack 
        </h1>

        <nav className="mb-10 border-b border-gray-200 pb-4">
          <ul className="flex gap-8 text-sm font-medium">

            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }
              >
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }
              >
                Doctors
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/patients"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }
              >
                Patients
              </NavLink>
            </li>

          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;

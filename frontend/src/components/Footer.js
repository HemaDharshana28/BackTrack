import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-serif text-slate-700 mb-1">BackTrack</h2>
          <p className="text-sm text-slate-500">
            KIT, Coimbatore
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <Link to="/report-lost" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            Report lost
          </Link>
          <Link to="/report-found" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            Report found
          </Link>
          <Link to="/matched-reports" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            Matches
          </Link>
          <Link to="/admin-login" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

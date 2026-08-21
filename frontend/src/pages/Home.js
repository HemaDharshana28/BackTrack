import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col bg-brand-cream min-h-screen">
      
      {/* Unified Hero Section */}
      <div className="w-full bg-[#fdfbf7] relative overflow-hidden flex flex-col items-center pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row relative z-10">
          
          {/* Left Side Content */}
          <div className="w-full md:w-5/12 flex flex-col justify-center pt-8 md:pt-16 pb-8 z-20">
            <h1 className="text-5xl lg:text-[4rem] font-serif font-bold leading-[1.1] mb-6 text-[#2d2d2d]">
              <span className="text-[#6d302b] block mb-2">Lost something?</span>
              We'll help you<br/>track it back.
            </h1>
            <p className="text-base text-gray-600 mb-8 max-w-sm leading-relaxed">
              BackTrack is the official Lost &amp; Found portal for our campus community. Report lost or found items and help get them back to their rightful owner.
            </p>

            <div className="mb-4">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#8a443e] hover:bg-[#723732] text-white text-sm font-medium rounded transition-colors shadow-sm"
                >
                  Go to Dashboard &rarr;
                </Link>
              ) : (
                <div className="flex gap-4">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#8a443e] hover:bg-[#723732] text-white text-sm font-medium rounded transition-colors shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded transition-colors shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Illustration */}
          <div className="w-full md:w-7/12 absolute md:relative right-0 top-0 h-full opacity-10 md:opacity-100 flex items-center justify-end z-0 md:z-10 pointer-events-none md:pointer-events-auto">
            <img 
              src={process.env.PUBLIC_URL + '/hero-illustration.jpg.jpeg'} 
              alt="BackTrack Items on Map" 
              className="w-full h-auto object-cover md:object-contain max-h-[700px] object-right-top"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/800x600/faf8f5/a0a0a0?text=Illustration+Not+Found";
              }}
            />
          </div>

        </div>
        
        {/* Bottom Centered Shield */}
        <div className="mt-16 flex items-center text-gray-600 text-[15px] z-20">
          <div className="w-8 h-8 rounded-full bg-[#fcf5f4] border border-[#f5e3e1] flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-[#8a443e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span>One campus. One community. Let's <strong className="font-bold text-[#3d5e45]">get it back.</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 flex flex-col gap-16">
        
        {/* Split Action Section - Pinned Notices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pt-8">
          
          {/* Lost Card */}
          <div className="relative bg-white p-8 md:p-10 rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transform -rotate-1 hover:rotate-0 transition-all duration-300 border border-gray-100 flex flex-col">
            {/* Pushpin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-brand-rust shadow-md border-b-2 border-black/20 flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-1"></div>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-2">
              Lost something on campus?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
              Describe the item and where you last had it. Your report is checked against every found item submitted by other students and staff.
            </p>
            <div className="mt-auto">
              <Link 
                to="/report-lost" 
                className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-rust text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
              >
                Report Lost Item <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Found Card */}
          <div className="relative bg-white p-8 md:p-10 rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transform rotate-1 hover:rotate-0 transition-all duration-300 border border-gray-100 flex flex-col mt-4 md:mt-0">
            {/* Pushpin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-brand-green shadow-md border-b-2 border-black/20 flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-1"></div>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-2">
              Found something that isn't yours?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
              Submit the item details so the owner can be identified. Handing an item in takes less than a minute and often ends someone's stressful day.
            </p>
            <div className="mt-auto">
              <Link 
                to="/report-found" 
                className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-green text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
              >
                Report Found Item <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>

        {/* My Reports Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mt-2 transition-shadow hover:shadow-md">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              My Reports
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Track the status of everything you have reported, review matches and mark items as returned once they are back with their owner.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link 
              to="/my-reports" 
              className="inline-flex justify-center items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              View My Reports <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </div>
        


        {/* How it works Section */}
        <div className="pt-8 pb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
                <span className="text-brand-blue font-serif text-xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Report a lost or found item
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Share the item details, where it was last seen and how you can be reached.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
                <span className="text-brand-blue font-serif text-xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Our system identifies potential matches
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Lost and found reports are compared on description, location and date.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-200">
                <span className="text-brand-blue font-serif text-xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Connect with the owner and reunite the item
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Once a match is confirmed, the portal shares verified contact details.
              </p>
            </div>

          </div>
        </div>

        {/* Before You Report Section */}
        <div className="border-t border-gray-200 pt-16 pb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
            Before you submit a report
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* For Lost Items */}
            <div className="bg-[#fdf8f7] border border-[#f5e3e1] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-[#8a443e] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#fdf5f4] border border-[#f5e3e1] flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-[#8a443e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                For lost items
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#8a443e] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>Remember the last location where you used it.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#8a443e] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>Include identifiable details.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#8a443e] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>Check existing found reports first.</span>
                </li>
              </ul>
            </div>

            {/* For Found Items */}
            <div className="bg-[#f7faf8] border border-[#e1ebd5]/50 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-[#3d5e45] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#f4fcf7] border border-[#e1ebd5]/60 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-[#3d5e45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                For found items
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3d5e45] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mention where and when you found it.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3d5e45] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Avoid publicly revealing highly specific identifying details.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#3d5e45] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Keep the item safe until it is returned.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

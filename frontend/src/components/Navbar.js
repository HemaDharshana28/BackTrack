import React, { useState, useRef, useEffect } from 'react';
import { NavLink as RouterLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const NavLink = ({ children, to, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <RouterLink
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'text-gray-900 bg-gray-100/50'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
      }`}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

const MobileNavLink = ({ children, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <RouterLink
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-gray-50 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </RouterLink>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const renderAvatar = (isMobile = false) => {
    const sizeClass = isMobile ? 'h-10 w-10' : 'h-9 w-9';
    if (user && user.profileImageUrl) {
        const raw = user.profileImageUrl.replace(/\\/g, '/');
        const src = (raw.startsWith('http://') || raw.startsWith('https://'))
          ? raw
          : (`${require('../config/api').default.replace(/\/+$/, '')}/${raw.replace(/^\/+/, '')}`);

        return (
          <img
            className={`${sizeClass} rounded-full object-cover`}
            src={src}
            alt="Profile"
          />
        );
      }
    return (
      <div className={`${sizeClass} rounded-full bg-brand-navy flex items-center justify-center text-white font-semibold text-sm`}>
        {user?.name ? getUserInitials(user.name) : <UserCircleIcon className="h-6 w-6" />}
      </div>
    );
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-cream/80 backdrop-blur-lg shadow-md border-b border-gray-200/60' 
          : 'bg-brand-cream border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={user && user.isAdmin ? "/admin-dashboard" : "/"} className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 tracking-tight">
                BackTrack
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                KIT-CBE
              </span>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-2">
              {user ? (
                user.isAdmin ? (
                  <>
                    <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/report-lost">Report Lost</NavLink>
                    <NavLink to="/report-found">Report Found</NavLink>
                    <NavLink to="/my-reports">My Reports</NavLink>
                    <NavLink to="/matched-reports">Matched Reports</NavLink>
                  </>
                )
              ) : (
                <>
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="/login">Sign In</NavLink>
                  <NavLink to="/register">Register</NavLink>
                  <NavLink to="/admin-login">Admin Login</NavLink>
                </>
              )}
            </div>
          </div>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center justify-end min-w-[120px]">
            {user ? (
              <>
                <div className="mr-4">
                  <NotificationBell />
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                    aria-label="User menu"
                  >
                    {renderAvatar(false)}
                    <span className="text-gray-700 font-medium text-sm">{user.name}</span>
                    <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        {!user.isAdmin && (
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <UserCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                            Your Profile
                          </Link>
                        )}
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>
                        <div className="border-t border-gray-100"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          role="menuitem"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-md text-sm font-medium text-white bg-brand-blue hover:bg-opacity-90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && <NotificationBell />}
            <button
               onClick={() => setMenuOpen(!menuOpen)}
               className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
               aria-expanded="false"
             >
               {menuOpen ? (
                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               )}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-gray-200">
          {user ? (
            <>
              <div className="pt-2 pb-3 space-y-1">
                {user.isAdmin ? (
                  <MobileNavLink to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</MobileNavLink>
                ) : (
                  <>
                    <MobileNavLink to="/home" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
                    <MobileNavLink to="/report-lost" onClick={() => setMenuOpen(false)}>Report Lost</MobileNavLink>
                    <MobileNavLink to="/report-found" onClick={() => setMenuOpen(false)}>Report Found</MobileNavLink>
                    <MobileNavLink to="/my-reports" onClick={() => setMenuOpen(false)}>My Reports</MobileNavLink>
                    <MobileNavLink to="/matched-reports" onClick={() => setMenuOpen(false)}>Matched Reports</MobileNavLink>
                  </>
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0 mr-3">
                    {renderAvatar(true)}
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {!user.isAdmin && (
                    <MobileNavLink to="/profile" onClick={() => setMenuOpen(false)}>Your Profile</MobileNavLink>
                  )}
                  <MobileNavLink to="/settings" onClick={() => setMenuOpen(false)}>Settings</MobileNavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-2 pb-3 space-y-1">
              <MobileNavLink to="/home" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/login" onClick={() => setMenuOpen(false)}>Sign In</MobileNavLink>
              <MobileNavLink to="/register" onClick={() => setMenuOpen(false)}>Register</MobileNavLink>
              <MobileNavLink to="/admin-login" onClick={() => setMenuOpen(false)}>Admin Login</MobileNavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
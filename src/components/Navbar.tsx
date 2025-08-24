import mbcplayLogo from "../assets/mbcplay-logo.png";
import { FaUserCircle, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg";

const Navbar: React.FC<{
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}> = ({ sidebarCollapsed, onSidebarToggle }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar custom-navbar bg-[#232b36] px-6 py-2 flex items-center justify-between border-b border-[#232b36] fixed top-0 left-0 right-0 z-40 w-full">
      {/* Left: Logo/Brand */}
      <div className="navbar-brand-row">
        {!sidebarCollapsed && (
          <img
            src={mbcplayLogo}
            alt="MBC Play Logo"
            className="navbar-logo-img"
          />
        )}
        {sidebarCollapsed && <span className="navbar-logo-m">M</span>}
        {!sidebarCollapsed && (
          <span className="navbar-brand-text">MBCPLAY</span>
        )}
        <button
          className="sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {!sidebarCollapsed ? (
            // Expanded: show left arrow with tail ("<-" style)
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sidebar-toggle-icon"
            >
              <circle cx="12.5" cy="12.5" r="10" fill="#ff7e31" />
              <path
                d="M16 12.5H9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 10L9 12.5L12 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Collapsed: show right arrow with tail ("->" style)
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sidebar-toggle-icon"
            >
              <circle cx="12.5" cy="12.5" r="10" fill="#ff7e31" />
              <path
                d="M9 12.5H16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13 10L16 12.5L13 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Right: Profile Dropdown */}
      <div className="flex items-center justify-end flex-1 navbar-profile-container">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={profileOpen}
          className="flex items-center bg-transparent border-none p-0 focus:outline-none navbar-profile-btn"
        >
          <img src={avatar} alt="Profile" className="navbar-profile-avatar" />
        </button>
        {profileOpen && (
          <div
            className="navbar-profile-dropdown"
            tabIndex={-1}
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <div className="navbar-profile-header">
              <img src={avatar} alt="Profile" />
              <div>
                <div className="profile-name">Ivan2 Norris2</div>
                <div className="profile-email">demo@streamit.com</div>
              </div>
            </div>
            <div className="navbar-profile-actions">
              <button>
                <span className="flex items-center gap-2">
                  <FaUser /> My Profile
                </span>
                <FaUserCircle className="opacity-60" />
              </button>
              <button>
                <span className="flex items-center gap-2">
                  <FaCog /> Settings
                </span>
                <FaCog className="opacity-60" />
              </button>
              <button onClick={handleLogout}>
                <span className="flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </span>
                <FaSignOutAlt className="opacity-60" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;

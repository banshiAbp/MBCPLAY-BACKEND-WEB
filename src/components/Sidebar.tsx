import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPhotoVideo,
  FaFilm,
  FaTv,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaUsers,
  FaCog,
  FaLayerGroup,
  FaMoneyBill,
  FaBell,
  FaUserTie,
  FaAd,
  FaRegListAlt,
} from "react-icons/fa";
import "../styles/sidebar.scss";

const Sidebar = ({
  collapsed,
  onCollapseChange,
}: {
  collapsed: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Submenu definitions
  const tvShowSubmenu = [
    { label: "TV Shows", to: "/tvshows" },
    { label: "Seasons", to: "/seasons" },
    { label: "Episodes", to: "/episodes" },
    { label: "Videos", to: "/videos" },
  ];
  const liveTvSubmenu = [{ label: "TV", to: "/livetv" }];
  const castCrewSubmenu = [
    { label: "Cast", to: "/cast" },
    { label: "Crew", to: "/crew" },
  ];

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      } bg-[#181f29] text-white min-h-screen flex flex-col border-r border-[#232b36] transition-all duration-200`}
      style={{
        width: collapsed ? "4rem" : "16rem",
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="relative flex flex-col items-center pt-6 pb-2 border-b border-[#232b36]">
        {/* Sidebar toggle button moved to Navbar */}
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* MAIN */}
        <div
          className={`sidebar-category-header text-xs mb-2 mt-6 ${
            collapsed ? "sidebar-category-collapsed" : "text-gray-400"
          }`}
        >
          {collapsed ? (
            <span className="sidebar-category-dash">&mdash;</span>
          ) : (
            "MAIN"
          )}
        </div>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaTachometerAlt
                className={collapsed ? "sidebar-icon-collapsed" : ""}
              />
              {!collapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link
              to="/media"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaPhotoVideo
                className={collapsed ? "sidebar-icon-collapsed" : ""}
              />
              {!collapsed && "Media Library"}
            </Link>
          </li>
        </ul>
        {/* MEDIA MANAGEMENT */}
        <div
          className={`sidebar-category-header text-xs mb-2 mt-6 ${
            collapsed ? "sidebar-category-collapsed" : "text-gray-400"
          }`}
        >
          {collapsed ? (
            <span className="sidebar-category-dash">&mdash;</span>
          ) : (
            "MEDIA MANAGEMENT"
          )}
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              to="/genres"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaLayerGroup
                className={collapsed ? "sidebar-icon-collapsed" : ""}
              />
              {!collapsed && "Genres"}
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaFilm className={collapsed ? "sidebar-icon-collapsed" : ""} />
              {!collapsed && "Movies"}
            </Link>
          </li>
          {/* TV Shows with submenu */}
          <li style={{ position: "relative" }}>
            <button
              onClick={() => toggleSubmenu("tvshows")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] focus:outline-none ${
                collapsed ? "justify-center" : ""
              }`}
              style={
                collapsed ? { paddingLeft: 0, justifyContent: "center" } : {}
              }
            >
              <FaTv className={collapsed ? "sidebar-icon-collapsed" : ""} />
              {!collapsed && "TV Shows"}
              {!collapsed &&
                (openSubmenus["tvshows"] ? (
                  <FaChevronDown className="ml-auto" />
                ) : (
                  <FaChevronRight className="ml-auto" />
                ))}
            </button>
            {collapsed && (
              <ul className="sidebar-collapsed-submenu-initials">
                {tvShowSubmenu.map((item) => (
                  <li
                    key={item.to}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "28px",
                    }}
                  >
                    <Link
                      to={item.to}
                      className="sidebar-collapsed-submenu-initial block w-full text-center hover:text-orange-400"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#9ca3af",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label.charAt(0)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {/* Expanded: show submenu as before */}
            {!collapsed && (
              <ul
                className={`ml-8 mt-1 space-y-1${
                  openSubmenus["tvshows"] ? " submenu-open" : ""
                }`}
              >
                {tvShowSubmenu.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block py-1 hover:text-orange-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        {/* LIVE TV */}
        <ul className="space-y-1 mt-2">
          <li style={{ position: "relative" }}>
            <button
              onClick={() => toggleSubmenu("livetv")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] focus:outline-none ${
                collapsed ? "justify-center" : ""
              }`}
              style={
                collapsed ? { paddingLeft: 0, justifyContent: "center" } : {}
              }
            >
              <FaRegListAlt
                className={collapsed ? "sidebar-icon-collapsed" : ""}
              />
              {!collapsed && "Live TV"}
              {!collapsed &&
                (openSubmenus["livetv"] ? (
                  <FaChevronDown className="ml-auto" />
                ) : (
                  <FaChevronRight className="ml-auto" />
                ))}
            </button>
            {collapsed && (
              <ul className="sidebar-collapsed-submenu-initials">
                {liveTvSubmenu.map((item) => (
                  <li
                    key={item.to}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "28px",
                    }}
                  >
                    <Link
                      to={item.to}
                      className="sidebar-collapsed-submenu-initial block w-full text-center hover:text-orange-400"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#9ca3af",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label.charAt(0)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!collapsed && (
              <ul
                className={`ml-8 mt-1 space-y-1${
                  openSubmenus["livetv"] ? " submenu-open" : ""
                }`}
              >
                {liveTvSubmenu.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block py-1 hover:text-orange-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        {/* CAST & CREW */}
        <ul className="space-y-1 mt-2">
          <li style={{ position: "relative" }}>
            <button
              onClick={() => toggleSubmenu("castcrew")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] focus:outline-none ${
                collapsed ? "justify-center" : ""
              }`}
              style={
                collapsed ? { paddingLeft: 0, justifyContent: "center" } : {}
              }
            >
              <FaUserTie
                className={collapsed ? "sidebar-icon-collapsed" : ""}
              />
              {!collapsed && "Cast & Crew"}
              {!collapsed &&
                (openSubmenus["castcrew"] ? (
                  <FaChevronDown className="ml-auto" />
                ) : (
                  <FaChevronRight className="ml-auto" />
                ))}
            </button>
            {collapsed && (
              <ul className="sidebar-collapsed-submenu-initials">
                {castCrewSubmenu.map((item) => (
                  <li
                    key={item.to}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "28px",
                    }}
                  >
                    <Link
                      to={item.to}
                      className="sidebar-collapsed-submenu-initial block w-full text-center hover:text-orange-400"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#9ca3af",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label.charAt(0)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!collapsed && (
              <ul
                className={`ml-8 mt-1 space-y-1${
                  openSubmenus["castcrew"] ? " submenu-open" : ""
                }`}
              >
                {castCrewSubmenu.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block py-1 hover:text-orange-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/ads"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaAd className={collapsed ? "sidebar-icon-collapsed" : ""} />
              {!collapsed && "Ads Manager"}
            </Link>
          </li>
        </ul>
        {/* SUBSCRIPTION */}
        <div
          className={`sidebar-category-header text-xs mb-2 mt-6 ${
            collapsed ? "sidebar-category-collapsed" : "text-gray-400"
          }`}
        >
          {collapsed ? (
            <span className="sidebar-category-dash">&mdash;</span>
          ) : (
            "SUBSCRIPTION"
          )}
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              to="/subscriptions"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaMoneyBill
                className={collapsed ? "sidebar-icon-collapsed" : ""}
              />
              {!collapsed && "Subscriptions"}
            </Link>
          </li>
          <li>
            <Link
              to="/plans"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <FaCog className={collapsed ? "sidebar-icon-collapsed" : ""} />
              {!collapsed && "Plans"}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

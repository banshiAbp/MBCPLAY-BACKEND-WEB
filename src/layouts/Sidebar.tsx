import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { leftMenus } from "../interfaces/sidebarMenus";
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
        {leftMenus.map((category, catIdx) => (
          <React.Fragment key={category.category}>
            <div
              className={`sidebar-category-header text-xs mb-2 mt-6 ${
                collapsed ? "sidebar-category-collapsed" : "text-gray-400"
              }`}
            >
              {collapsed ? (
                <span className="sidebar-category-dash">&mdash;</span>
              ) : (
                category.category
              )}
            </div>
            <ul className={catIdx < 3 ? "space-y-1 mt-2" : "space-y-1"}>
              {category.menus.map((menu) => {
                const hasSubmenu = menu.submenu && menu.submenu.length > 0;
                const submenuKey = menu.label.replace(/\s+/g, "").toLowerCase();
                return (
                  <li
                    key={menu.to}
                    style={{ position: hasSubmenu ? "relative" : undefined }}
                  >
                    {hasSubmenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(submenuKey)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] focus:outline-none ${
                            collapsed ? "justify-center" : ""
                          }`}
                          style={
                            collapsed
                              ? { paddingLeft: 0, justifyContent: "center" }
                              : {}
                          }
                        >
                          {menu.icon &&
                            React.cloneElement(
                              menu.icon as React.ReactElement<any>,
                              {
                                className: collapsed
                                  ? "sidebar-icon-collapsed"
                                  : "",
                              }
                            )}
                          {!collapsed && menu.label}
                          {!collapsed &&
                            (openSubmenus[submenuKey] ? (
                              <FaChevronDown className="ml-auto" />
                            ) : (
                              <FaChevronRight className="ml-auto" />
                            ))}
                        </button>
                        {collapsed && menu.submenu && (
                          <ul className="sidebar-collapsed-submenu-initials">
                            {menu.submenu.map((item) => (
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
                        {!collapsed && menu.submenu && (
                          <ul
                            className={`ml-8 mt-1 space-y-1${
                              openSubmenus[submenuKey] ? " submenu-open" : ""
                            }`}
                          >
                            {menu.submenu.map((item) => (
                              <li key={item.to}>
                                <Link
                                  to={item.to}
                                  className="block py-1 hover:text-orange-400"
                                >
                                  {item.icon &&
                                    React.cloneElement(
                                      item.icon as React.ReactElement<any>,
                                      {
                                        style: {
                                          marginRight: 6,
                                          fontSize: "1em",
                                          verticalAlign: "middle",
                                        },
                                      }
                                    )}
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={menu.to}
                        className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#232b36] hover:text-[#ff7e31] ${
                          collapsed ? "justify-center" : ""
                        }`}
                      >
                        {menu.icon &&
                          React.cloneElement(
                            menu.icon as React.ReactElement<any>,
                            {
                              className: collapsed
                                ? "sidebar-icon-collapsed"
                                : "",
                            }
                          )}
                        {!collapsed && menu.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

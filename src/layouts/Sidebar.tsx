import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Function to check if a path matches any submenu item
  const isSubmenuItemActive = (submenuItems: any[], currentPath: string) => {
    return submenuItems.some(item => currentPath.startsWith(item.to));
  };

  // Function to check if a main menu item should be active
  const isMainMenuItemActive = (menuTo: string, currentPath: string) => {
    // Exact match
    if (currentPath === menuTo) {
      console.log(`Exact match: ${menuTo} === ${currentPath}`);
      return true;
    }
    
    // For paths that should only match exactly (like dashboard)
    if (menuTo === "/dashboard") {
      return false;
    }
    
    // For other paths, check if current path starts with the menu path followed by a slash
    // This prevents /media from matching /media-management
    const isActive = currentPath.startsWith(menuTo + "/");
    if (isActive) {
      console.log(`Path match: ${currentPath} starts with ${menuTo}/`);
    }
    return isActive;
  };

  // Function to find and open the appropriate submenu based on current path
  const updateOpenSubmenus = () => {
    const newOpenSubmenus: { [key: string]: boolean } = {};
    
    leftMenus.forEach(category => {
      category.menus.forEach(menu => {
        if (menu.submenu && menu.submenu.length > 0) {
          const submenuKey = menu.label.replace(/\s+/g, "").toLowerCase();
          // Check if current path matches any submenu item
          if (isSubmenuItemActive(menu.submenu, location.pathname)) {
            newOpenSubmenus[submenuKey] = true;
          }
        }
      });
    });
    
    setOpenSubmenus(prev => ({ ...prev, ...newOpenSubmenus }));
  };

  // Update open submenus when location changes
  useEffect(() => {
    updateOpenSubmenus();
    console.log("Current pathname:", location.pathname);
  }, [location.pathname]);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      } min-h-screen flex flex-col transition-all duration-200`}
      style={{ 
        backgroundColor: "var(--bs-secondary-bg)", 
        color: "var(--bs-text-primary)", 
        borderRight: "1px solid var(--bs-border-color)",
        width: collapsed ? "4rem" : "16rem",
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="relative flex flex-col items-center pt-6 pb-2" style={{ borderBottom: "1px solid var(--bs-border-color)" }}>
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
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded focus:outline-none ${
                            collapsed ? "justify-center" : ""
                          } ${
                            (() => {
                              const isActive = menu.submenu && isSubmenuItemActive(menu.submenu, location.pathname);
                              if (isActive) {
                                console.log("Active main menu:", menu.label, "for path:", location.pathname);
                              }
                              return isActive ? "active-menu-item" : "";
                            })()
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
                                style: collapsed && menu.submenu && isSubmenuItemActive(menu.submenu, location.pathname)
                                  ? { color: "var(--bs-brand-primary)" }
                                  : undefined,
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
                            {menu.submenu.map((item) => {
                              const isActive = location.pathname.startsWith(item.to);
                              return (
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
                                      color: isActive ? "var(--bs-brand-primary)" : "var(--bs-text-muted)",
                                      letterSpacing: "0.05em",
                                    }}
                                  >
                                    {item.label.charAt(0)}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {!collapsed && menu.submenu && (
                          <ul
                            className={`ml-8 mt-1 space-y-1${
                              openSubmenus[submenuKey] ? " submenu-open" : ""
                            }`}
                          >
                            {menu.submenu.map((item) => {
                              const isActive = location.pathname.startsWith(item.to);
                              if (isActive) {
                                console.log("Active submenu item:", item.label, "for path:", location.pathname);
                              }
                              return (
                                <li key={item.to}>
                                  <Link
                                    to={item.to}
                                    className={`block py-1 hover:text-orange-400 ${
                                      isActive ? "active-submenu-item" : ""
                                    }`}
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
                              );
                            })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={menu.to}
                        className={`flex items-center gap-3 px-3 py-2 rounded ${
                          collapsed ? "justify-center" : ""
                        } ${
                          isMainMenuItemActive(menu.to, location.pathname)
                            ? "active-menu-item"
                            : ""
                        }`}
                      >
                        {menu.icon &&
                          React.cloneElement(
                            menu.icon as React.ReactElement<any>,
                            {
                              className: collapsed
                                ? "sidebar-icon-collapsed"
                                : "",
                              style: collapsed && isMainMenuItemActive(menu.to, location.pathname)
                                ? { color: "var(--bs-brand-primary)" }
                                : undefined,
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

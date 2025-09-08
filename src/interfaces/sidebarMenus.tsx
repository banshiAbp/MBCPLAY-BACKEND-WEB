import React from "react";
import {
  FaTachometerAlt,
  FaPhotoVideo,
  FaFilm,
  FaTv,
  FaUsers,
  FaCog,
  FaLayerGroup,
  FaMoneyBill,
  FaBell,
  FaUserTie,
  FaAd,
  FaRegListAlt,
  FaLanguage,
} from "react-icons/fa";

export interface SidebarSubMenu {
  label: string;
  to: string;
  icon?: React.ReactNode;
}

export interface SidebarMenu {
  label: string;
  to: string;
  icon: React.ReactNode;
  submenu?: SidebarSubMenu[];
}

export interface SidebarCategory {
  category: string;
  menus: SidebarMenu[];
}

export const leftMenus: SidebarCategory[] = [
  {
    category: "MAIN",
    menus: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        label: "Media Library",
        to: "/media",
        icon: <FaPhotoVideo />,
      },
    ],
  },
  {
    category: "ALL MANAGEMENT",
    menus: [
      {
        label: "Media Management",
        to: "/media-management",
        icon: <FaFilm />,
        submenu: [
          {
            label: "Categories",
            to: "/media-management/categories",
            icon: <FaRegListAlt />,
          },
          {
            label: "Genres",
            to: "/media-management/genres",
            icon: <FaLayerGroup />,
          },
          {
            label: "Languages",
            to: "/media-management/languages",
            icon: <FaLanguage />,
          },
          {
            label: "Maturity Ratings",
            to: "/media-management/maturity-ratings",
            icon: <FaLayerGroup />,
          },
          {
            label: "Advertisement",
            to: "/media-management/advertisements",
            icon: <FaAd />,
          },
        ],
      },

      { label: "Movies", to: "/movies", icon: <FaFilm /> },
      {
        label: "Live TV",
        to: "/livetv",
        icon: <FaTv />,
        submenu: [{ label: "TV", to: "/livetv", icon: <FaTv /> }],
      },
      {
        label: "Cast & Crew",
        to: "/cast-crew",
        icon: <FaUsers />,
        submenu: [
          { label: "Cast", to: "/cast", icon: <FaUserTie /> },
          { label: "Crew", to: "/crew", icon: <FaUserTie /> },
        ],
      },
      {
        label: "Ads Manager",
        to: "/ads-manager",
        icon: <FaAd />,
      },
    ],
  },
  {
    category: "SUBSCRIPTION",
    menus: [
      {
        label: "Subscriptions",
        to: "/subscriptions",
        icon: <FaMoneyBill />,
      },
      {
        label: "Plans",
        to: "/plans",
        icon: <FaCog />,
      },
    ],
  },
  {
    category: "SETTINGS",
    menus: [
      {
        label: "Settings",
        to: "/settings",
        icon: <FaCog />,
      },
      {
        label: "Notifications",
        to: "/notifications",
        icon: <FaBell />,
      },
    ],
  },
];

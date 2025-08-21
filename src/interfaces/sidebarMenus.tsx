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
    category: "MEDIA MANAGEMENT",
    menus: [
      { label: "Genres", to: "/genres", icon: <FaLayerGroup /> },
      { label: "Movies", to: "/movies", icon: <FaFilm /> },
      {
        label: "TV Shows",
        to: "/tvshows",
        icon: <FaTv />,
        submenu: [
          { label: "Seasons", to: "/seasons", icon: <FaRegListAlt /> },
          { label: "Episodes", to: "/episodes", icon: <FaRegListAlt /> },
          { label: "Videos", to: "/videos", icon: <FaRegListAlt /> },
        ],
      },
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

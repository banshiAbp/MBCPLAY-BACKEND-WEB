import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CategoriesPage from "../pages/media-management/categories/Categories";
import ManageCategories from "../pages/media-management/categories/ManageCategories";
import Genres from "../pages/media-management/genres/Genres";
import ManageGenres from "../pages/media-management/genres/ManageGenres";
import Languages from "../pages/media-management/languages/Languages";
import ManageLanguage from "../pages/media-management/languages/ManageLanguage";
import MaturityRatings from "../pages/media-management/maturity-ratings/MaturityRatings";
import ManageMaturityRating from "../pages/media-management/maturity-ratings/ManageMaturityRating";
import Advertisements from "../pages/media-management/advertisements/Advertisements";
import ManageAdvertisement from "../pages/media-management/advertisements/ManageAdvertisement";

// Main routes configuration
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Core application routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Media Management routes */}
      <Route
        path="/media-management/categories"
        element={isAuthenticated ? <CategoriesPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/categories/manage-categories"
        element={isAuthenticated ? <ManageCategories /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/categories/edit/:id"
        element={isAuthenticated ? <ManageCategories /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/media-management/genres"
        element={isAuthenticated ? <Genres /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/genres/manage-genres"
        element={isAuthenticated ? <ManageGenres /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/genres/manage-genres/:id"
        element={isAuthenticated ? <ManageGenres /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/media-management/languages"
        element={isAuthenticated ? <Languages /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/languages/manage"
        element={isAuthenticated ? <ManageLanguage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/languages/manage/:id"
        element={isAuthenticated ? <ManageLanguage /> : <Navigate to="/login" replace />}
      />

      {/* Maturity Ratings routes */}
      <Route
        path="/media-management/maturity-ratings"
        element={isAuthenticated ? <MaturityRatings /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/maturity-ratings/manage"
        element={isAuthenticated ? <ManageMaturityRating /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/maturity-ratings/manage/:id"
        element={isAuthenticated ? <ManageMaturityRating /> : <Navigate to="/login" replace />}
      />

      {/* Advertisement routes */}
      <Route
        path="/media-management/advertisements"
        element={isAuthenticated ? <Advertisements /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/advertisements/manage-advertisements"
        element={isAuthenticated ? <ManageAdvertisement /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media-management/advertisements/manage-advertisements/:id"
        element={isAuthenticated ? <ManageAdvertisement /> : <Navigate to="/login" replace />}
      />

      {/* Future routes can be added here */}
    </Routes>
  );
};

export default AppRoutes;

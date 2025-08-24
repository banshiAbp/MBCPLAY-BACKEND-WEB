import React, { useState, ReactElement } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CategoriesPage from "./pages/media-management/categories/Categories";
import "./styles/main.scss";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarToggle = () => setSidebarCollapsed((prev) => !prev);
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const token = localStorage.getItem("token");

  return (
    <div style={{ minHeight: "100vh", background: "#181f29" }}>
      {!isLogin && (
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={handleSidebarToggle}
        />
      )}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isLogin && (
          <Sidebar
            collapsed={sidebarCollapsed}
            onCollapseChange={setSidebarCollapsed}
          />
        )}
        <main style={{ flex: 1, overflow: "auto", background: "#181f29" }}>
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !token ? <Login /> : <Navigate to="/dashboard" replace />
              }
            />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/media-management/categories"
              element={
                token ? <CategoriesPage /> : <Navigate to="/login" replace />
              }
            />
            {/* Additional routes can be added here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);
export default AppWithRouter;

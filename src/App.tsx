import React, { useState, ReactElement, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { initializeAuth } from "./store/authSlice";
import { loadAuthFromStorage } from "./utils/authPersistence";
import AppRoutes from "./routes";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import "./styles/main.scss";

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const handleSidebarToggle = () => setSidebarCollapsed((prev) => !prev);
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeApp = () => {
      const storedAuth = loadAuthFromStorage();
      if (storedAuth) {
        dispatch(initializeAuth({
          token: storedAuth.token,
          user: storedAuth.user
        }));
      }
      setIsInitialized(true);
    };

    initializeApp();
  }, [dispatch]);

  // Show loading while initializing auth state
  if (!isInitialized) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "var(--bs-secondary-bg)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "var(--bs-text-primary)"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bs-secondary-bg)" }}>
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
        <main style={{ flex: 1, overflow: "auto", background: "var(--bs-secondary-bg)" }}>
          <AppRoutes />
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

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./styles/main.scss";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarToggle = () => setSidebarCollapsed((prev) => !prev);
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#181f29" }}>
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={handleSidebarToggle}
        />
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar
            collapsed={sidebarCollapsed}
            onCollapseChange={setSidebarCollapsed}
          />
          <main style={{ flex: 1, overflow: "auto", background: "#181f29" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Additional routes can be added here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

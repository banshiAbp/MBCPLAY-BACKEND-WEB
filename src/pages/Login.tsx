import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginStart, loginSuccess, loginFailure, clearError } from "../store/authSlice";
import { saveAuthToStorage } from "../utils/authPersistence";
import "../styles/login.scss";
import API_BASE_URL from "../config/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());
    
    if (!username.trim()) {
      setLocalError("Username (email or phone) is required");
      return;
    }
    if (!password.trim()) {
      setLocalError("Password is required");
      return;
    }
    
    dispatch(loginStart());
    
    try {
      const res = await fetch(`${API_BASE_URL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ucredential: username,
          pcredential: password,
          deviceDetails: "Web Browser",
          osDetails: window.navigator.userAgent,
        }),
      });
      const data = await res.json();
      
      if (res.ok && data.data?.jwtToken) {
        const { jwtToken, ...userData } = data.data;
        
        // Dispatch success action with user data
        dispatch(loginSuccess({ 
          token: jwtToken, 
          user: userData 
        }));
        
        // Save to localStorage for persistence
        saveAuthToStorage(jwtToken, userData);
        
        navigate("/dashboard");
      } else {
        dispatch(loginFailure(data.message || "Login failed"));
      }
    } catch (err) {
      dispatch(loginFailure("Network error"));
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo-row">
          <span className="login-logo">M</span>
          <span className="login-title">MBCPLAY</span>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email or Phone</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="demo@mbcplay.com or 987XXXXX10"
            autoComplete="username"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <div className="login-options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember Me
            </label>
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>
          {(error || localError) && <div className="login-error">{error || localError}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

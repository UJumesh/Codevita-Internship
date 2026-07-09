import React from "react";
import { FaRocket, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-mark">
          <FaRocket className="logo-icon" />
        </div>

        <div>
          <h2>SkillSync</h2>
          <small>Track Skills. Build Your Future.</small>
        </div>
      </div>

      <div className="nav-actions">
        <span className="nav-pill">Premium UI</span>
        <span className="nav-pill">Live Dashboard</span>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
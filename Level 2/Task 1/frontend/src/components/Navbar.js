import React from "react";
import { FaRocket } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaRocket className="logo-icon" />

        <div>
          <h2>SkillSync</h2>
          <small>Track Skills. Build Your Future.</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
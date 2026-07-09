import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "230px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>SkillSync</h2>

      <hr />

      <p>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
      </p>

      <p>
        <Link
          to="/users"
          style={{ color: "white", textDecoration: "none" }}
        >
          Users
        </Link>
      </p>

      <p>
        <Link
          to="/skills"
          style={{ color: "white", textDecoration: "none" }}
        >
          Skills
        </Link>
      </p>

      <p>
        <Link
          to="/profile"
          style={{ color: "white", textDecoration: "none" }}
        >
          Profile
        </Link>
      </p>
    </div>
  );
}

export default Sidebar;
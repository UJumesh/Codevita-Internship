import { useEffect, useState } from "react";
import { FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";

function UserList({ refresh, search, setTotalUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();

      setUsers(data);
      setTotalUsers(data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete skill.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="user-list">
        <h2>Registered Skills</h2>
        <p className="loading-text">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Registered Skills</h2>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <FaUserCircle className="empty-icon" />
          <h3>No Skills Found</h3>
          <p>Start by adding your first skill.</p>
        </div>
      ) : (
        filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-info">
              <FaUserCircle className="avatar" />

              <div className="skill-details">
                <h3>{user.name}</h3>

                <span className="skill-badge">
                  Frontend
                </span>

                <p>Intermediate</p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "80%" }}
                  ></div>
                </div>

                <small>80% Complete</small>
              </div>
            </div>

            <div className="actions">
              <button className="edit-btn">
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteUser(user.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;
import { useEffect, useState, useCallback } from "react";
import { FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";

function UserList({ refresh, search, setTotalUsers, onEditUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();

      setUsers(data.data || []);
      setTotalUsers(data.count || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [setTotalUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refresh]);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete skill.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const renderStatus = (email) => {
    if (!email) return "Pending profile";
    return "Active user";
  };

  if (loading) {
    return (
      <div className="user-list">
        <div className="section-header">
          <h2 className="section-title">Registered Users</h2>
          <span className="section-tag">Live data</span>
        </div>

        <div className="loading-card">
          <div className="spinner" />
          <div>
            <h3>Loading users</h3>
            <p>Refreshing your user dashboard in real time.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="section-header">
        <div>
          <h2 className="section-title">Registered Users</h2>
          <p className="section-copy">A polished overview of your team members and quick actions.</p>
        </div>
        <span className="section-tag">{filteredUsers.length} active</span>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <FaUserCircle className="empty-icon" />
          <h3>No users found</h3>
          <p>Try searching a name or email, or add a user to get started.</p>
        </div>
      ) : (
        <div className="user-grid">
          {filteredUsers.map((user) => (
            <article className="user-card" key={user.id}>
              <div className="card-top">
                <div className="avatar-badge">
                  <FaUserCircle className="avatar" />
                </div>
                <div className="user-summary">
                  <h3>{user.name}</h3>
                  <p className="user-email">{user.email || "No email provided"}</p>
                </div>
              </div>

              <div className="user-details">
                <span className="status-pill">{renderStatus(user.email)}</span>
                <p className="user-note">Profile status is up to date.</p>
              </div>

              <div className="user-actions">
                <button className="action-btn edit-btn" type="button" title="Edit user" onClick={() => onEditUser && onEditUser(user)}>
                  <FaEdit /> Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => deleteUser(user.id)} type="button" title="Delete user">
                  <FaTrash /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;

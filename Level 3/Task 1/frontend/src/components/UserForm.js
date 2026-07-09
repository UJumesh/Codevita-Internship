import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

function UserForm({ onUserAdded, onUserUpdated, editingUser, cancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        email: editingUser.email || "",
        password: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [editingUser]);

  const saveUser = async () => {
    if (!formData.name || !formData.email || (!editingUser && !formData.password)) {
      alert("Name, email, and password are required.");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      if (editingUser) {
        await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (onUserUpdated) {
          onUserUpdated();
        }

        alert("User updated successfully!");
      } else {
        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (onUserAdded) {
          onUserAdded();
        }

        alert("User added successfully!");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div>
          <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
          <p>{editingUser ? "Adjust user details and save changes." : "Create a polished profile in a few clicks."}</p>
        </div>
      </div>

      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder={editingUser ? "Leave blank to keep current password" : "Password"}
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <div className="form-actions">
          <button onClick={saveUser} type="button" className="primary-btn">
            <FaPlusCircle />
            <span>{editingUser ? "Update User" : "Add User"}</span>
          </button>
          {editingUser && (
            <button onClick={cancelEdit} type="button" className="secondary-btn">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserForm;

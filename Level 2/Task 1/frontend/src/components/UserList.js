import { useEffect, useState } from "react";

function UserList({ refresh }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id}. {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
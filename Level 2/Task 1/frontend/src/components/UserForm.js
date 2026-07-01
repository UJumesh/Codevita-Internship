import { useState } from "react";

function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");

  const addUser = async () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      alert("User Added Successfully: " + data.name);

      setName("");

      // Refresh User List
      onUserAdded();
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addUser}>
        Add User
      </button>
    </div>
  );
}

export default UserForm;
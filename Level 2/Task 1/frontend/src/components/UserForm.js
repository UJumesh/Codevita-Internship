import { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={() => alert(name)}>
        Add User
      </button>
    </div>
  );
}

export default UserForm;
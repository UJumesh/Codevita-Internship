import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

function UserForm({ onUserAdded }) {
  const [skillName, setSkillName] = useState("");

  const addSkill = async () => {
    if (!skillName.trim()) {
      alert("Please enter a skill name");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: skillName
        }),
      });

      const data = await response.json();

      setSkillName("");

      if (onUserAdded) {
        onUserAdded();
      }

      alert(`Skill "${data.name}" added successfully!`);
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="user-form">

      <input
        type="text"
        placeholder="Enter Skill Name"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      />

      <button onClick={addSkill}>
        <FaPlusCircle />
        <span>Add Skill</span>
      </button>

    </div>
  );
}

export default UserForm;
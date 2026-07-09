import { useState } from "react";
import axios from "axios";

function SkillForm({ onSkillAdded }) {
  const [skill, setSkill] = useState({
    skillName: "",
    category: "",
    level: "Beginner",
    progress: 0,
  });

  const handleChange = (e) => {
    setSkill({
      ...skill,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/skills", skill);

      alert("Skill Added Successfully");

      setSkill({
        skillName: "",
        category: "",
        level: "Beginner",
        progress: 0,
      });

      onSkillAdded();
    } catch (error) {
      console.error(error);
      alert("Failed to add skill");
    }
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div>
          <h3>Add New Skill</h3>
          <p>Track your growth with a clear, polished view.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="skillName"
          placeholder="Skill Name"
          value={skill.skillName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={skill.category}
          onChange={handleChange}
          required
        />

        <select name="level" value={skill.level} onChange={handleChange}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          type="number"
          name="progress"
          placeholder="Progress %"
          value={skill.progress}
          onChange={handleChange}
        />

        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
}

export default SkillForm;
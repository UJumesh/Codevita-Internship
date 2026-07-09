import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaTools } from "react-icons/fa";

function SkillList({ refresh, search, setTotalSkills }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/skills");

      setSkills(res.data.data);
      setTotalSkills(res.data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setTotalSkills]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills, refresh]);

  const deleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.skillName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-list">
      <div className="section-header">
        <h2 className="section-title">Skill Library</h2>
        <span className="section-tag">{filteredSkills.length} tracked</span>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p className="loading-text">Loading skills...</p>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="empty-state">
          <FaTools className="empty-icon" />
          <h3>No Skills Found</h3>
          <p>Start by adding your first skill to the library.</p>
        </div>
      ) : (
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <div className="skill-card" key={skill.id}>
              <h3>{skill.skillName}</h3>
              <p className="meta">{skill.category}</p>
              <span className="skill-badge">{skill.level}</span>

              <div className="progress-bar" style={{ width: "100%", marginTop: "6px" }}>
                <div className="progress-fill" style={{ width: `${skill.progress || 0}%` }}></div>
              </div>

              <div className="skill-card-footer">
                <strong>{skill.progress || 0}%</strong>
                <button className="delete-btn" onClick={() => deleteSkill(skill.id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillList;
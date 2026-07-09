import React from "react";

function DashboardCard({ icon, title, value }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">{icon}</div>

      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
        <span className="card-trend">Updated now</span>
      </div>
    </div>
  );
}

export default DashboardCard;
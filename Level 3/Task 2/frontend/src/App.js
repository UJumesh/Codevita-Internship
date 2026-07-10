import { useEffect, useState } from "react";
import socket from "./socket";
import "./App.css";

function App() {
  const [skill, setSkill] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [username] = useState(() => `User${Math.floor(Math.random() * 9000) + 100}`);

  useEffect(() => {

    const handleReceiveNotification = (data) => {
      setNotifications((prev) => [data, ...prev]);
    };

    const handleOnlineUsers = (count) => {
      setOnlineUsers(count);
    };

    const handleConnectionStatus = (payload) => {
      setConnected(payload?.status === "connected");
    };

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("receiveNotification", handleReceiveNotification);
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("connectionStatus", handleConnectionStatus);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveNotification", handleReceiveNotification);
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("connectionStatus", handleConnectionStatus);
    };
  }, []);


  const sendNotification = () => {

    const trimmedSkill = skill.trim();
    if (!trimmedSkill) return;

    const data = {
      user: username,
      skill: trimmedSkill
    };

    socket.emit("sendSkill", data);

    setSkill("");
  };


  return (
    <div className="page-shell">
      <div className="app-card">
        <div className="header-row">
          <div>
            <div className="section-label">🔔 Real-Time Skill Notification</div>
            <p className="subtitle">Live updates with WebSocket broadcasts and online user tracking.</p>
          </div>
          <div className={`status-pill ${connected ? "online" : "offline"}`}>
            <span className="status-dot" />
            {connected ? "Connected" : "Offline"}
          </div>
        </div>

        <div className="summary-row">
          <div className="status-box">
            <span className="status-icon">{connected ? "🟢" : "🔴"}</span>
            <div>
              <strong>{connected ? "Connected" : "Disconnected"}</strong>
              <span>{onlineUsers} user{onlineUsers === 1 ? "" : "s"} online</span>
            </div>
          </div>
          <div className="user-chip">Signed in as <strong>{username}</strong></div>
        </div>

        <div className="form-card">
          <label htmlFor="skillInput">Enter skill name</label>
          <div className="form-row">
            <input
              id="skillInput"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter skill name"
            />
            <button onClick={sendNotification}>Add Skill</button>
          </div>
        </div>

        <div className="notifications-panel">
          <div className="notifications-title">
            <h2>Recent Notifications</h2>
            <span className="notification-count">{notifications.length}</span>
          </div>

          {notifications.length === 0 ? (
            <div className="empty-state">No notifications yet. Add a skill to broadcast live updates.</div>
          ) : (
            notifications.map((item, index) => (
              <div className={`notification ${item.type === "info" ? "info" : "skill"}`} key={`${item.time}-${index}`}>
                <div className="notification-message">{item.message}</div>
                <small>{item.time}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import { FaCode, FaBullseye, FaProjectDiagram, FaStar } from "react-icons/fa";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import SearchBar from "../components/SearchBar";

import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

import SkillForm from "../components/Skills/SkillForm";
import SkillList from "../components/Skills/SkillList";

import socket from "../socket";

function Dashboard() {

  const [refreshUsers, setRefreshUsers] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editingUser, setEditingUser] = useState(null);

  const [refreshSkills, setRefreshSkills] = useState(false);
  const [totalSkills, setTotalSkills] = useState(0);

  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState([]);


  // Socket Notification Listener
  useEffect(() => {

    if (!socket) {
      return;
    }


    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });


    socket.on("receiveNotification", (data) => {

      console.log("Notification Received:", data);


      setNotifications((prev) => [
        {
          message: data.message || "New activity",
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);

    });



    return () => {

      socket.off("connect");
      socket.off("receiveNotification");

    };


  }, []);




  const reloadUsers = () => {
    setRefreshUsers((prev) => !prev);
    setEditingUser(null);
  };


  const handleUserUpdated = () => {
    setRefreshUsers((prev) => !prev);
    setEditingUser(null);
  };


  const handleEditUser = (user) => {
    setEditingUser(user);
  };


  const cancelEdit = () => {
    setEditingUser(null);
  };


  const reloadSkills = () => {
    setRefreshSkills((prev) => !prev);
  };



  return (

    <div className="App">

      <Navbar />


      <div className="dashboard">


        <section className="hero-panel">

          <div className="hero-copy">

            <div className="hero-badge">
              <FaStar /> Premium Admin Experience
            </div>


            <h1>
              SkillSync Dashboard
            </h1>


            <p>
              Manage users, showcase skills, and present your learning journey with a polished SaaS-style experience.
            </p>


            <div className="hero-actions">

              <span className="hero-stat">
                Realtime sync
              </span>

              <span className="hero-stat accent">
                Modern UI
              </span>

            </div>

          </div>



          <div className="hero-card">

            <div className="hero-kpi">
              <span>Live</span>
              <strong>Skill Analytics</strong>
            </div>


            <div className="hero-kpi">
              <span>Activity</span>
              <strong>Daily</strong>
            </div>


            <div className="hero-kpi small">
              <span>Operations ready</span>
              <strong>24/7</strong>
            </div>


          </div>


        </section>





        <div className="cards">

          <DashboardCard
            icon={<FaCode />}
            title="Total Skills"
            value={totalSkills}
          />


          <DashboardCard
            icon={<FaBullseye />}
            title="Total Users"
            value={totalUsers}
          />


          <DashboardCard
            icon={<FaProjectDiagram />}
            title="Projects"
            value="3"
          />


        </div>






        <section className="section">


          <div className="section-header">

            <div>

              <div className="section-eyebrow">
                Live Activity
              </div>


              <h2>
                🔔 Notifications
              </h2>

            </div>


            <span className="section-tag">
              Real Time
            </span>


          </div>



          {
            notifications.length === 0 ? (

              <p>
                No new notifications
              </p>

            ) : (

              notifications.map((item,index)=>(

                <div
                  key={index}
                  className="notification-card"
                >

                  <strong>
                    {item.message}
                  </strong>


                  <small>
                    {item.time}
                  </small>


                </div>

              ))

            )
          }



        </section>





        <SearchBar
          search={search}
          setSearch={setSearch}
        />





        <section className="section">


          <div className="section-header">

            <div>

              <div className="section-eyebrow">
                Operations
              </div>


              <h2>
                👤 User Management
              </h2>

            </div>


            <span className="section-tag">
              Realtime
            </span>


          </div>



          <UserForm
            onUserAdded={reloadUsers}
            onUserUpdated={handleUserUpdated}
            editingUser={editingUser}
            cancelEdit={cancelEdit}
          />



          <UserList
            refresh={refreshUsers}
            search={search}
            setTotalUsers={setTotalUsers}
            onEditUser={handleEditUser}
          />



        </section>







        <section className="section">


          <div className="section-header">

            <div>

              <div className="section-eyebrow">
                Growth
              </div>


              <h2>
                💻 Skill Management
              </h2>

            </div>


            <span className="section-tag">
              Progress
            </span>


          </div>



          <SkillForm
            onSkillAdded={reloadSkills}
          />



          <SkillList
            refresh={refreshSkills}
            search={search}
            setTotalSkills={setTotalSkills}
          />



        </section>



      </div>


    </div>

  );

}


export default Dashboard;
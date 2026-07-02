import { FaCode, FaBullseye, FaProjectDiagram } from "react-icons/fa";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import DashboardCard from "./components/DashboardCard";
import SearchBar from "./components/SearchBar";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  const refreshUsers = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <Navbar />

      <div className="dashboard">

    <div className="cards">
  <DashboardCard
    icon={<FaCode />}
    title="Total Skills"
    value={totalUsers}
  />

  <DashboardCard
    icon={<FaBullseye />}
    title="Learning Goals"
    value="5"
  />

  <DashboardCard
    icon={<FaProjectDiagram />}
    title="Projects"
    value="3"
  />
</div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <UserForm onUserAdded={refreshUsers} />

        <UserList
          refresh={refresh}
          search={search}
          setTotalUsers={setTotalUsers}
        />

      </div>
    </div>
  );
}

export default App;
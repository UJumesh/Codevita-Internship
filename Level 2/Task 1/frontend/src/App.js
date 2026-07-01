import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshUsers = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Hello Umesh</h1>

      <UserForm onUserAdded={refreshUsers} />
      <UserList refresh={refresh} />
    </div>
  );
}

export default App;
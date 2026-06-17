import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <div>
      <h1>User Management System</h1>

      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout({ children }) {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            padding: "25px",
            background: "#f5f5f5",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
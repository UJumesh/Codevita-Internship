import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function AppRoutes() {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			<Route
				path="/login"
				element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
			/>
			<Route
				path="/signup"
				element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />}
			/>
			<Route
				path="/dashboard"
				element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
			/>
			<Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
		</Routes>
	);
}

export default AppRoutes;

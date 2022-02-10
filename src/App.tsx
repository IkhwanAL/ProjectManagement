import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProjectPage from "./Layout/AllProject.Layout";
import Dashboard from "./Layout/Dashboard.Layout";
import LoginPages from "./Layout/Login.Layout";
import OneProject from "./Layout/OneProject.Layout";
import RecentPage from "./Layout/Recent.Layout";
import RegisterPage from "./Layout/Register.Layout";

function App() {
	return (
		<div className="bg-blue-300">
			<Routes>
				<Route path="/" element={<LoginPages />} />
				<Route path="/signup" element={<RegisterPage />} />
				<Route
					path="/main/dashboard"
					element={<Dashboard />}
					caseSensitive
				>
					<Route index element={<RecentPage />} />
					<Route path="project" element={<ProjectPage />} />
					<Route
						path="project/detail/:idProject"
						element={<OneProject />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;

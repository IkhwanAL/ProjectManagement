import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProjectPage from "./Layout/AllProject.Layout";
import Dashboard from "./Layout/Dashboard.Layout";
import LoginPages from "./Layout/Login.Layout";
import NotFound from "./Layout/NotFound.Layout";
import OneProject from "./Layout/OneProject.Layout";
import RecentPage from "./Layout/Recent.Layout";
import { RedirectToVerify } from "./Layout/Redirect.Layout";
import RegisterPage from "./Layout/Register.Layout";
import { userSelector } from "./redux/user/userSlice";

// declare module "@mui/material/styles" {
// 	interface Theme {
// 		status: {
// 			danger: React.CSSProperties["color"];
// 		};
// 	}

// 	interface Palette {
// 		neutral: Palette["primary"];
// 	}
// 	interface PaletteOptions {
// 		neutral: PaletteOptions["primary"];
// 	}

// 	interface PaletteColor {
// 		darker?: string;
// 	}
// 	interface SimplePaletteColorOptions {
// 		darker?: string;
// 	}
// 	interface ThemeOptions {
// 		status: {
// 			danger: React.CSSProperties["color"];
// 		};
// 	}
// }

function App() {
	return (
		<div>
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
				{/* <Route path="*" element={<NotFound />} /> */}
				<Route path="/verify" element={<RedirectToVerify />} />
			</Routes>
		</div>
	);
}

export default App;

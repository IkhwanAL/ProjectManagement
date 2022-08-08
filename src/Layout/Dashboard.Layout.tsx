import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer.Component";
import HeaderUI from "../Components/HeaderUI.Component";
import { userSelector } from "../redux/user/userSlice";

const Dashboard = () => {
	const navigate = useNavigate();
	const user = useSelector(userSelector);

	useEffect(() => {
		if (!user.isLogin) {
			navigate("/", { replace: true });
			return () => {};
		}

		return () => {};
	}, []);

	return (
		<>
			<HeaderUI />
			<Box>
				<Outlet />
			</Box>
			<Box my={2}>
				<Footer />
			</Box>
		</>
	);
};

export default Dashboard;

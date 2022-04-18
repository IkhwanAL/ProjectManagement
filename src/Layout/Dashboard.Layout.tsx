import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderUI from "../Components/HeaderUI.Component";
import { userSelector } from "../redux/user/userSlice";

const Dashboard = () => {
	// const dispatch = useDispatch();
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
			<div className="h-screen m-auto p-auto flex-col">
				<HeaderUI />
				<Outlet />
				<div className="bg-secondaryPurple absolute m-auto w-full h-10 bottom-0">
					<Stack direction={"row"} justifyContent="center">
						<Typography
							fontStyle={"normal"}
							className="text-white p-2"
						>
							Made With Material UI And Tailwind Css
						</Typography>
					</Stack>
				</div>
			</div>
		</>
	);
};

export default Dashboard;

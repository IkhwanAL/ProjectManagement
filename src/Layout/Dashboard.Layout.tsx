import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
			<div className="bg-primary">
				<HeaderUI />
				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;

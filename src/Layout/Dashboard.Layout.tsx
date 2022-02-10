import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderUI from "../Components/HeaderUI.Component";
import {
	StatusFetchUser,
	statusUser,
	userSelector,
} from "../redux/user/userSlice";
import { modalStore } from "../store/modal.store";

const Dashboard = () => {
	const status = useSelector(statusUser);
	const navigate = useNavigate();
	if (status === StatusFetchUser.FAILED) {
		navigate("/", { replace: true });
	}

	const [modal, setModal] = useState<boolean>(modalStore.initValue);
	const userData = useSelector(userSelector);

	useLayoutEffect(() => {
		const subscription = modalStore.subscribe(setModal);

		return () => {
			subscription.unsubscribe();
		};
	}, [modal]);
	return (
		<>
			<HeaderUI />
			<Outlet />
		</>
	);
};

export default Dashboard;

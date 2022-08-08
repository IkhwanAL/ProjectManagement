import { Paper, Stack } from "@mui/material";
import { FormLogin } from "../Components/Form/FormLogin.Component";
import { FormRegister } from "../Components/Form/FormRegister.Component";
import LandingPage from "./LandingPage.Layout";

const LoginPages = () => {
	return (
		<>
			<Stack
				direction={"row"}
				sx={{
					background:
						// "linear-gradient(to right bottom, #36EAEF, #6B0AC9)",
						"linear-gradient(to right bottom, #2563eb, #4f46e5)",
				}}
			>
				<FormLogin />
			</Stack>
		</>
	);
};

export default LoginPages;

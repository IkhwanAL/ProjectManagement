import { Paper, Stack, Typography } from "@mui/material";
import { FormLogin } from "../Components/Form/FormLogin.Component";
import { FormRegister } from "../Components/Form/FormRegister.Component";

const LandingPage = () => {
	return (
		<Paper
			sx={{
				width: "80%",
				background: "inherit",
			}}
			elevation={2}
		>
			<Typography>
				Aplikasi Web App Dengan Kemampuan Critical Path Method
			</Typography>
		</Paper>
	);
};

export default LandingPage;

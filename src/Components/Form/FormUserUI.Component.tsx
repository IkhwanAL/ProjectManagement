import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	FormControl,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { user } from "../../@types/database.types";
import { ModalPropsUI } from "../../Props/Modal.property";
import { useGetUserByIdQuery } from "../../redux/user/userApi";
import { userSelector } from "../../redux/user/userSlice";
import { Colors } from "../../Styles/Colors";

export default function FormUserUI({ setModal }: ModalPropsUI) {
	const { data } = useGetUserByIdQuery(null, {
		refetchOnReconnect: true,
	});
	const [user, setUser] = React.useState<user>();

	React.useEffect(() => {
		if (data) {
			setUser({
				phoneNumber: data.data?.phoneNumber,
				firstName: data.data?.firstName,
				lastName: data.data?.lastName,
				username: data.data?.username,
				email: data.data?.email,
				id: data.data?.id,
			});
		}
	}, []);

	return (
		<>
			<Box component={"form"} autoComplete={"on"} margin={10}>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Typography variant="h4">Edit Profile</Typography>
				</Box>
				<Stack>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormControl margin="normal" fullWidth>
								<TextField
									label="Firstname"
									value={user?.firstName}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl margin="normal" fullWidth>
								<TextField label="Lastname" />
							</FormControl>
						</Grid>
					</Grid>
					<FormControl>
						<TextField label="Username" margin="normal" />
					</FormControl>
					<FormControl>
						<TextField label="Email" margin="normal" />
					</FormControl>
					<FormControl>
						<TextField label="Phone Number" margin="normal" />
					</FormControl>
				</Stack>
				<Stack direction={"row"} justifyContent="space-between" mt={3}>
					<Button
						variant="contained"
						style={{ background: Colors.error }}
					>
						Cancel
					</Button>
					<LoadingButton variant="contained">Save</LoadingButton>
				</Stack>
			</Box>
		</>
	);
}

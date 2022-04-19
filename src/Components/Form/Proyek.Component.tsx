import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	InputLabelProps,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { user } from "../../@types/database.types";
import { useError } from "../../hooks/useError";
import { useSuccess } from "../../hooks/useSuccess";
import { ProyekValueState } from "../../interface/proyek.interface";
import { ModalPropsUI } from "../../Props/Modal.property";
import { useLazyRefreshTokenQuery } from "../../redux/auth/authApi";
import { userSelector } from "../../redux/user/userSlice";
import { Colors } from "../../Styles/Colors";
import AnyModal from "../Modal/Any.Component";

export default function ProyekForm({ setModal }: ModalPropsUI) {
	const initial: ProyekValueState = {
		projectName: "",
		projectDescription: "",
	};

	const [proyek, setProyek] = React.useState<ProyekValueState>(initial);

	const OnChangeTextField = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProyek((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
	};

	return (
		<>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Typography variant="h4">Edit Profile</Typography>
			</Box>
			<Box
				component={"form"}
				autoComplete={"off"}
				margin={10}
				mt="0"
				noValidate
			>
				<Stack>
					<FormControl>
						<TextField
							label="Nama Proyek"
							margin="normal"
							name="projectName"
							onChange={OnChangeTextField}
							value={proyek?.projectName}
							id="projectName"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Deskripsi Proyek"
							margin="normal"
							name="projectDescription"
							onChange={OnChangeTextField}
							value={proyek?.projectDescription}
							id="projectDescription"
							InputLabelProps={{
								shrink: true,
							}}
							multiline
							rows={3}
							maxRows={4}
						/>
					</FormControl>
				</Stack>
				<Stack direction={"row"} justifyContent="space-between" mt={3}>
					<Button
						variant="contained"
						// style={{ background: Colors.error }}
						onClick={setModal}
						color="secondary"
					>
						Cancel
					</Button>
					<LoadingButton
						variant="contained"
						// onClick={OnSave}
						// loading={PathUserHooks.isLoading}
					>
						Save
					</LoadingButton>
				</Stack>
			</Box>
		</>
	);
}

import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AnyModalProps } from "../../Props/Modal.property";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
	Alert,
	Backdrop,
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	Modal,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useChangePasswordMutation } from "../../redux/user/userApi";
import { useError } from "../../hooks/useError";
import { ErrorMsg } from "../../Props/Error.property";
import { useSuccess } from "../../hooks/useSuccess";
import { useLazyRefreshTokenQuery } from "../../redux/auth/authApi";
import { LoadingButton } from "@mui/lab";

interface Ps {
	description: "";
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 5,
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export default function AddProyekDetail({
	isOpen,
	closeModal,
	action,
}: AnyModalProps) {
	const [text, saveText] = React.useState("");

	const onSubmit = () => {
		if (text) {
			if (action) {
				action(text);
			}
		}
		saveText("");
		closeModal("close");
	};

	const OnChangeText = (ev: React.ChangeEvent<HTMLInputElement>) => {
		saveText(ev.target.value);
	};

	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={closeModal}>
				<Box sx={{ ...style, width: 400 }}>
					<Typography component={"h2"}>
						Menambah Detail Kegiatan
					</Typography>

					<Stack direction={"column"}>
						<FormControl>
							<TextField
								label="Detail Kegiatan"
								margin="dense"
								onChange={OnChangeText}
								multiline
								minRows={3}
							/>
						</FormControl>
					</Stack>
					<Stack
						direction={"row"}
						justifyContent="space-between"
						p={1}
					>
						<Button color="error" onClick={closeModal}>
							Tutup
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={onSubmit}
						>
							Simpan
						</Button>
					</Stack>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

import Add from "@mui/icons-material/Add";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	Modal,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { AnyModalProps } from "../../Props/Modal.property";
import { useGetUserTeamQuery } from "../../redux/project/projectApi";
import { UserTeamSelect } from "../../types/return.types";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/userSlice";
import FormAddTeam from "../Form/FormAddTeam.Component";

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

interface UserTeamChecked extends UserTeamSelect {
	isChecked: boolean;
}

/**
 * Mengambil Data Team Dari Id Proyek
 *
 * @returns
 */
export const MainListTeam = ({
	isOpen,
	closeModal,
	idProyek,
}: AnyModalProps) => {
	const User = useSelector(userSelector);

	const { data, isSuccess } = useGetUserTeamQuery(idProyek as number, {
		refetchOnMountOrArgChange: true,
	});

	const [userControl, setUserControl] = React.useState<UserTeamChecked[]>([]);

	const [removeUser, setRemoveUser] = React.useState<Array<any>>([]);

	const [showFormAddListTim, setShowFormAddListTim] =
		React.useState<boolean>(false);

	const ControlModalAddListTim = () => {
		setShowFormAddListTim((pre) => !pre);
	};

	const OnChecked = (teamid: number) => {
		const payload = [];
		for (const iterator of userControl) {
			const team = iterator;
			if (team.teamId === teamid) {
				team.isChecked = !team.isChecked;
			}

			payload.push(team);
		}

		setUserControl(payload);

		// Filter Data Dengan Data Terbaru
		const findUser = payload.filter((x) => x.teamId === teamid)[0];

		// Jika True Check, Revert To False
		// And Remove From RemoveUser State
		if (findUser.isChecked) {
			setRemoveUser((prev) => [...prev, teamid]);
		} else {
			setRemoveUser((prev) => prev.filter((x) => x !== teamid));
		}
	};

	// console.log(userControl);

	React.useEffect(() => {
		if (isSuccess && data?.data) {
			const payload1 = [];
			for (const iterator of data.data) {
				const payload = {
					...iterator,
					isChecked: false,
				} as UserTeamSelect & { isChecked: boolean };
				payload1.push(payload);
			}

			setUserControl(payload1);
		}
	}, [isSuccess]);

	const OnSubmit = () => {
		const findIndex = removeUser.findIndex((x) => x === User?.id);

		if (findIndex === -1) {
			console.log(userControl, removeUser);
		}
	};

	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={closeModal}>
				<Box sx={{ ...style, width: 400 }}>
					<Stack
						direction={"row"}
						justifyContent="space-between"
						alignItems={"center"}
					>
						<Typography component={"h2"} textAlign="center">
							List Tim
						</Typography>

						<IconButton onClick={ControlModalAddListTim}>
							<Add />
						</IconButton>
					</Stack>

					<FormControl component={"fieldset"} variant="standard">
						<FormGroup>
							{userControl && userControl.length ? (
								userControl.map((x) => (
									<FormControlLabel
										control={
											<Checkbox
												checked={x.isChecked}
												onChange={() =>
													OnChecked(x.teamId)
												}
											/>
										}
										label={x.user.username}
										key={x.teamId}
									/>
								))
							) : (
								<></>
							)}
						</FormGroup>
					</FormControl>
					<Stack
						direction={"row"}
						justifyContent="space-between"
						p={1}
					>
						<Button color="primary" onClick={closeModal}>
							Tutup
						</Button>
						<Button
							color="error"
							variant="contained"
							onClick={OnSubmit}
						>
							Hapus
						</Button>
					</Stack>

					<FormAddTeam
						closeModal={ControlModalAddListTim}
						isOpen={showFormAddListTim}
					/>
				</Box>
			</Modal>
		</React.Fragment>
	);
};

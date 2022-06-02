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
import {
	ProjectApi,
	useDeleteUserTeamMutation,
	useGetUserTeamQuery,
} from "../../redux/project/projectApi";
import { UserTeamSelect } from "../../types/return.types";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/userSlice";
import FormAddTeam from "../Form/FormAddTeam.Component";
import { useError } from "../../hooks/useError";
import ModalInfo from "./ErrorModal.Component";
import { ISuccess } from "../../interface/return.interface";
import { useSuccess } from "../../hooks/useSuccess";
import { proyekSelector } from "../../redux/project/projectSlice";

interface UserTeamChecked extends UserTeamSelect {
	isChecked: boolean;
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
	const Proyek = useSelector(proyekSelector);

	const { data, isSuccess, isFetching, refetch } = useGetUserTeamQuery(
		idProyek as number,
		{
			refetchOnMountOrArgChange: true,
		}
	);

	const [DeleteUser] = useDeleteUserTeamMutation();

	const { errorState, HandleControlStateError } = useError({
		error: false,
	});

	const { successState, HandleControlStateSuccess } = useSuccess({
		error: true,
	});

	const [userControl, setUserControl] = React.useState<UserTeamChecked[]>([]);

	const [removeUser, setRemoveUser] = React.useState<Array<number>>([]);

	const [showFormAddListTim, setShowFormAddListTim] =
		React.useState<boolean>(false);

	const ControlModalAddListTim = () => {
		setShowFormAddListTim((pre) => !pre);
	};

	const OnChecked = (userId: number) => {
		const payload = [];
		for (const iterator of userControl) {
			const team = iterator;
			if (team.userId === userId) {
				team.isChecked = !team.isChecked;
			}

			payload.push(team);
		}

		setUserControl(payload);

		// Filter Data Dengan Data Terbaru
		const findUser = payload.filter((x) => x.userId === userId)[0];

		// Jika True Check, Revert To False
		// And Remove From RemoveUser State
		if (findUser.isChecked) {
			setRemoveUser((prev) => [...prev, userId]);
		} else {
			setRemoveUser((prev) => prev.filter((x) => x !== userId));
		}
	};

	React.useEffect(() => {
		if (!isFetching && data?.data) {
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

		return () => {};
	}, [isSuccess, isFetching]);

	const OnSubmitRemove = () => {
		const findIndex = removeUser.findIndex((x) => x === User?.id);
		// console.log(removeUser);
		if (findIndex === -1) {
			// return;
			DeleteUser({ Data: removeUser, idProject: Proyek })
				.unwrap()
				.then((payload: ISuccess) => {
					if (payload.data) {
						setRemoveUser([]);
						HandleControlStateSuccess(
							"Success",
							"Berhasil Manghapus",
							refetch
						);
					} else {
						HandleControlStateError(
							"Gagal!",
							payload.error?.data.message
						);
					}
				})
				.catch((err) => {
					HandleControlStateError(
						"Gagal!",
						err.data.message ?? "Terjadi Kesalahan Pada Server"
					);
				});
			return;
		}
		setRemoveUser([]);
		HandleControlStateError("Gagal!", "Tidak Bisa Menghapus Diri Sendiri");
	};

	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={closeModal}>
				<Box sx={{ ...style, width: 400 }}>
					<ModalInfo
						isOpen={errorState.error}
						closeModal={HandleControlStateError}
						head={(errorState.head as string) ?? "Gagal!"}
						msg={
							(errorState.msg as string) ??
							"Terjadi Kesalahan Pada Server"
						}
					/>
					<ModalInfo
						isOpen={!successState.error}
						closeModal={HandleControlStateSuccess}
						head={(successState.head as string) ?? "Success"}
						msg={
							(successState.msg as string) ?? "Berhasil mengubah"
						}
					/>
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
													OnChecked(x.userId)
												}
											/>
										}
										label={x.user.username}
										key={x.userId}
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
							onClick={OnSubmitRemove}
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

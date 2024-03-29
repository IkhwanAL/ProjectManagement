import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Modal,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { AnyModalProps } from "../../Props/Modal.property";
import { UserTeamSelect } from "../../types/return.types";

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

interface UserTeamSelected extends UserTeamSelect {
	isSelect: boolean;
}

/**
 * Mengambil Data Team Dari Id Proyek
 *
 * @returns
 */
export const ListTeam = ({
	isOpen,
	closeModal,
	action,
	data,
	dataToCompare,
}: AnyModalProps) => {
	const [list, setList] = React.useState<UserTeamSelected[]>([]);

	React.useEffect(() => {
		if (data) {
			//
			const res = data as UserTeamSelect[];
			const payloadList = [];
			if (dataToCompare) {
				const ComparingData = dataToCompare;
				for (const iterator of res) {
					const it = iterator;
					const arr = ComparingData.find(
						(x: any) => x.idUser === it.userId
					);

					payloadList.push({ ...it, isSelect: arr ? true : false });
				}
			} else {
				for (const iterator of res) {
					const it = iterator;

					payloadList.push({ ...it, isSelect: false });
				}
			}
			const SRT = payloadList as UserTeamSelected[];
			setList(SRT);
		}
	}, [data, dataToCompare]);

	const OnSubmit = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		closeModal();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

	const ControlCheckBox = (
		checked: boolean,
		key: any,
		username: string,
		idUser: number,
		onChange: (...arg: any) => void
	) => {
		return (
			<Checkbox
				checked={checked}
				onChange={(ev) => onChange(ev, idUser, username)}
				key={key}
			/>
		);
	};

	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={closeModal}>
				<Box sx={{ ...style, width: 400 }}>
					<Typography component={"h2"} textAlign="center">
						List Tim
					</Typography>

					<FormControl component={"fieldset"} variant="standard">
						<FormLabel>Assign Team</FormLabel>
						<FormGroup>
							{list && list.length !== 0 ? (
								list.map((x) => (
									<FormControlLabel
										control={ControlCheckBox(
											x.isSelect,
											x.teamId,
											x.user.username,
											x.userId,
											action ?? handleChange
										)}
										key={x.teamId}
										label={x.user.username}
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
						<Button color="error" onClick={closeModal}>
							Tutup
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={OnSubmit}
						>
							Simpan
						</Button>
					</Stack>
				</Box>
			</Modal>
		</React.Fragment>
	);
};

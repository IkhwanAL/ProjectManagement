import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Modal,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import React, { useCallback, useRef } from "react";
import { useError } from "../../hooks/useError";
import { AnyModalProps } from "../../Props/Modal.property";
import {
	useChangeOwnerMutation,
	useGetLeaderQuery,
	useGetUserTeamQuery,
} from "../../redux/project/projectApi";
import { userteam_role } from "../../types/database.types";
import { UserTeamSelect } from "../../types/return.types";
import AnyModal from "../Modal/Any.Component";

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
export const ChangeOwnerForm = ({
	isOpen,
	closeModal,
	action,
	idProyek,
}: AnyModalProps) => {
	const ListTeamHooks = useGetUserTeamQuery(idProyek as number, {
		refetchOnMountOrArgChange: true,
	});
	const [ChangeOwner, ChangeOwnerHooks] = useChangeOwnerMutation();
	const refLeader = useRef<number>();
	const [list, setList] = React.useState<UserTeamSelected[]>([]);
	const [leader, setLeader] = React.useState<number>();
	const { errorState, setErrorState } = useError({ error: false });

	React.useEffect(() => {
		if (ListTeamHooks.isSuccess) {
			const payload = [] as Array<UserTeamSelected>;

			if (ListTeamHooks.data.data) {
				for (const iterator of ListTeamHooks.data.data) {
					if (iterator.role === userteam_role.Proyek_Manager) {
						const pay = { ...iterator, isSelect: true };
						setLeader(iterator.userId);
						refLeader.current = iterator.userId;
						payload.push(pay);
					} else {
						const pay = { ...iterator, isSelect: false };
						payload.push(pay);
					}
				}
			}
			setList(payload);
		}

		return () => {
			setLeader(undefined);
			setList([]);
		};
	}, [ListTeamHooks.isSuccess]);

	const onChangeLeader = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>, value: string) => {
			const payload = [];
			for (const iterator of list) {
				if (iterator.userId === parseInt(value)) {
					const pay = { ...iterator, isSelect: true };
					payload.push(pay);
				} else {
					const pay = { ...iterator, isSelect: false };
					payload.push(pay);
				}
			}
			setList(payload);
			setLeader(parseInt(value));
		},
		[leader]
	);

	const Submit = async () => {
		if (leader === refLeader.current) {
			return;
		}

		const payload = {
			idProject: idProyek,
			idUserInvitation: leader,
		};

		ChangeOwner(payload)
			.unwrap()
			.then(() => {
				closeModal();
			})
			.catch(() => {
				setErrorState({
					error: true,
					head: "Gagal Menganti Kepemilikan",
					msg: "Terjadi Kesalahan Pada Server",
				});
			});
	};

	const OnErrorCloseModal = () => {
		setErrorState({
			error: false,
			head: undefined,
			msg: undefined,
		});
	};

	return (
		<React.Fragment>
			<AnyModal
				closeModal={OnErrorCloseModal}
				isOpen={errorState.error}
				head={errorState.head as string}
				msg={errorState.msg as string}
			/>
			<Modal open={isOpen} onClose={closeModal}>
				<Box sx={{ ...style, width: 400 }}>
					<Typography component={"h2"} textAlign="center">
						Ubah Pemilikan
					</Typography>

					<FormControl component={"fieldset"} variant="standard">
						<RadioGroup onChange={onChangeLeader}>
							{list && list.length !== 0 ? (
								list.map((x) => (
									<>
										<FormControlLabel
											control={
												<Radio
													checked={x.isSelect}
													key={x.teamId + ""}
												/>
											}
											key={x.teamId + ""}
											label={x.user.username}
											value={x.userId}
										/>
									</>
								))
							) : (
								<></>
							)}
						</RadioGroup>
					</FormControl>
					<Stack
						direction={"row"}
						justifyContent="space-between"
						p={1}
					>
						<Button color="error" onClick={closeModal}>
							Tutup
						</Button>
						<LoadingButton
							color="primary"
							variant="contained"
							onClick={Submit}
							loading={ChangeOwnerHooks.isLoading}
						>
							Simpan
						</LoadingButton>
					</Stack>
				</Box>
			</Modal>
		</React.Fragment>
	);
};

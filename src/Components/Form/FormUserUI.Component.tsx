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
import { ModalPropsUI } from "../../Props/Modal.property";
import { useLazyRefreshTokenQuery } from "../../redux/auth/authApi";
import {
	useGetUserByIdQuery,
	usePatchUserMutation,
} from "../../redux/user/userApi";
import { userSelector } from "../../redux/user/userSlice";
import { Colors } from "../../Styles/Colors";
import AnyModal from "../Modal/Any.Component";

export default function FormUserUI({ setModal }: ModalPropsUI) {
	const { data, isSuccess, isError, error, refetch } = useGetUserByIdQuery(
		null,
		{
			refetchOnReconnect: true,
		}
	);

	const [triggerRefreshToken] = useLazyRefreshTokenQuery();
	const [PatchUser, PathUserHooks] = usePatchUserMutation();

	const [user, setUser] = React.useState<Partial<user>>();

	const { errorState, setErrorState } = useError({ error: false });
	const { successState, setSuccessState } = useSuccess({ error: true });

	React.useLayoutEffect(() => {
		if (isSuccess) {
			setUser({
				phoneNumber: data.data?.phoneNumber,
				firstName: data.data?.firstName,
				lastName: data.data?.lastName,
				username: data.data?.username,
				email: data.data?.email,
				id: data.data?.id,
			});
		}
	}, [isSuccess]);

	React.useEffect(() => {
		const err = error as { [key: string]: any };

		if (isError) {
			if (err.data.data.name === "TokenExpire") {
				triggerRefreshToken(null, true)
					.unwrap()
					.then(() => {
						refetch();
					})
					.catch(console.log);
			}
		}
	}, [isError]);

	const OnChangeTextField = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setUser((prevState) => ({
			...prevState,
			[ev.target.name]: ev.target.value,
		}));
	};

	const OnSave = () => {
		console.log(user);
		if (user?.id) {
			const { id, ...rest } = user;
			PatchUser(rest).unwrap().catch(console.log);
		} else {
			PatchUser(user).unwrap().catch(console.log);
		}
	};

	React.useEffect(() => {
		if (PathUserHooks.isSuccess) {
			setSuccessState({
				error: false,
				head: "Success",
				msg: "Sukses Memperbarui Data",
			});

			refetch();
		}
	}, [PathUserHooks.isSuccess]);

	React.useEffect(() => {
		const err = error as { [key: string]: any };

		if (PathUserHooks.isError) {
			if (err?.status === "FETCH_ERROR") {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal login!",
					msg: "Terjadi Kesalahan Pada Server",
				});
			} else if (err.data.data.name === "TokenExpire") {
				triggerRefreshToken(null, true)
					.unwrap()
					.then(() => {
						if (user?.id) {
							const { id, ...rest } = user;
							PatchUser(rest).unwrap().catch(console.log);
						} else {
							PatchUser(user).unwrap().catch(console.log);
						}
					})
					.catch(console.log);
			} else {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal login!",
					msg: err.data.message ?? "Terjadi Kesalahan Pada Server",
				});
			}
		}
	}, [PathUserHooks.isError]);

	const OnCloseModalError = () => {
		setErrorState({ ...errorState, error: false });
	};

	const OnCloseModalSuccess = () => {
		setSuccessState({ ...errorState, error: true });
	};

	return (
		<>
			<AnyModal
				closeModal={OnCloseModalError}
				isOpen={errorState.error}
				head={errorState.head as string}
				msg={errorState.msg as string}
			/>
			<AnyModal
				closeModal={OnCloseModalSuccess}
				isOpen={!successState.error}
				head={successState.head as string}
				msg={successState.msg as string}
			/>
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
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormControl margin="normal" fullWidth>
								<TextField
									label="Firstname"
									onChange={OnChangeTextField}
									name="firstName"
									value={user?.firstName}
									id="firstName"
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl margin="normal" fullWidth>
								<TextField
									label="Lastname"
									onChange={OnChangeTextField}
									name="lastName"
									value={user?.lastName}
									id="lastName"
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<FormControl>
						<TextField
							label="Username"
							margin="normal"
							name="username"
							onChange={OnChangeTextField}
							value={user?.username}
							id="username"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Email"
							margin="normal"
							name="email"
							disabled
							onChange={OnChangeTextField}
							value={user?.email}
							id="email"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Phone Number"
							margin="normal"
							name="phoneNumber"
							onChange={OnChangeTextField}
							value={user?.phoneNumber}
							id="phoneNumber"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
				</Stack>
				<Stack direction={"row"} justifyContent="space-between" mt={3}>
					<Button
						variant="contained"
						onClick={setModal}
						color="secondary"
					>
						Cancel
					</Button>
					<LoadingButton
						variant="contained"
						onClick={OnSave}
						loading={PathUserHooks.isLoading}
					>
						Save
					</LoadingButton>
				</Stack>
			</Box>
		</>
	);
}

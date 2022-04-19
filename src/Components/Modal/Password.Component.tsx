import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AnyModalProps } from "../../Props/Modal.property";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
	Alert,
	Backdrop,
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	Snackbar,
	Stack,
	TextField,
} from "@mui/material";
import { useChangePasswordMutation } from "../../redux/user/userApi";
import { useError } from "../../hooks/useError";
import { ErrorMsg } from "../../Props/Error.property";
import { useSuccess } from "../../hooks/useSuccess";
import { useLazyRefreshTokenQuery } from "../../redux/auth/authApi";
import { LoadingButton } from "@mui/lab";

interface Ps {
	password: string;
	currentPassword: string;
	confirmPassword: string;
}

export default function ChangePassword({ isOpen, closeModal }: AnyModalProps) {
	const initial: Ps = {
		password: "",
		currentPassword: "",
		confirmPassword: "",
	};

	const [ChangePs, { isSuccess, isError, error, isLoading }] =
		useChangePasswordMutation();
	const [triggerRefreshToken] = useLazyRefreshTokenQuery();

	const [seeCurrent, setSeeCurrent] = React.useState(false);
	const [seeNew, setSeeNew] = React.useState(false);
	const [seeConfirm, setSeeConfirm] = React.useState(false);
	const [ps, setPs] = React.useState<Ps>(initial);

	const { errorState, setErrorState } = useError({ error: false });
	const { successState, setSuccessState } = useSuccess({ error: true });

	const OnChangeInputHandle = (
		_ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPs((prev) => ({
			...prev,
			[_ev.target.name]: _ev.target.value,
		}));
	};

	const seeCurrentPass = () => {
		setSeeCurrent((prev) => !prev);
	};

	const seeNewPass = () => {
		setSeeNew((prev) => !prev);
	};

	const seeConfirmPass = () => {
		setSeeConfirm((prev) => !prev);
	};

	const onSubmit = () => {
		if (!ps.password) {
			setErrorState({
				error: true,
				head: "Gagal Mengubah",
				msg: "Password Tidak Kosong",
			});
			return 0;
		}
		if (!ps.confirmPassword) {
			setErrorState({
				error: true,
				head: "Gagal Mengubah",
				msg: "Konfirmasi Password Tidak Kosong",
			});
			return 0;
		}
		if (ps.password !== ps.confirmPassword) {
			setErrorState({
				error: true,
				head: "Gagal Mengubah",
				msg: "Password Tidak Sama Dengan Konfirmasi Password",
			});
			return 0;
		}

		const { confirmPassword, ...rest } = ps;

		ChangePs(rest);
	};

	React.useLayoutEffect(() => {
		if (isSuccess) {
			setSuccessState({
				error: false,
				head: "Berhasil",
				msg: "Password Berhasil Diganti",
			});
		}
	}, [isSuccess]);

	React.useLayoutEffect(() => {
		const err = error as { [key: string]: any };
		if (isError) {
			if (err?.status === "FETCH_ERROR") {
				setErrorState({
					error: true,
					head: "Gagal Mengubah",
					msg: "Terjadi Kesalahan Pada Server",
				});
			} else if (err?.status === 403) {
				setErrorState({
					error: true,
					head: "Gagal Mengubah",
					msg: err?.data?.message,
				});
			} else if (err.data.data.name === "TokenExpire") {
				triggerRefreshToken(null, true)
					.unwrap()
					.then(() => {
						const { confirmPassword, ...rest } = ps;

						ChangePs(rest);
					})
					.catch(console.log);
			} else {
				setErrorState({
					error: true,
					head: "Gagal Mengubah",
					msg: err.data.message ?? "Terjadi Kesalahan Pada Server",
				});
			}
		}
	}, [isError]);

	const onCloseErrorSnackBar = () => {
		setErrorState({
			error: false,
			head: "",
			msg: "",
		});
	};

	const onCloseSuccessSnackBar = () => {
		setSuccessState({
			error: true,
			head: "",
			msg: "",
		});
	};

	return (
		<React.Fragment>
			<Backdrop open={isOpen} onClick={closeModal}>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					open={errorState.error}
					onClose={onCloseErrorSnackBar}
					key={"topcenter"}
				>
					<Alert severity="error">{errorState.msg}</Alert>
				</Snackbar>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					open={!successState.error}
					onClose={onCloseSuccessSnackBar}
					key={"topcenter1"}
				>
					<Alert severity="info">{successState.msg}</Alert>
				</Snackbar>
				<Transition appear show={isOpen} as={React.Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 z-100 overflow-y-auto"
						onClose={closeModal}
					>
						<div className="min-h-screen px-4 text-center">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0" />
							</Transition.Child>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span
								className="inline-block h-screen align-middle"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Change Password
									</Dialog.Title>
									<div className="mt-2">
										<Box
											component={"form"}
											autoComplete={"off"}
											margin={5}
											mt="0"
											noValidate
										>
											<Stack direction={"column"}>
												<FormControl fullWidth>
													<TextField
														label="Current Password"
														InputLabelProps={{
															shrink: true,
														}}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		onClick={
																			seeCurrentPass
																		}
																	>
																		{seeCurrent ? (
																			<VisibilityOffIcon />
																		) : (
																			<VisibilityIcon />
																		)}
																	</IconButton>
																</InputAdornment>
															),
														}}
														type={
															seeCurrent
																? "text"
																: "password"
														}
														name="currentPassword"
														margin="dense"
														onChange={
															OnChangeInputHandle
														}
													/>
												</FormControl>
												<FormControl>
													<TextField
														label="New Password"
														InputLabelProps={{
															shrink: true,
														}}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		onClick={
																			seeNewPass
																		}
																	>
																		{seeNew ? (
																			<VisibilityOffIcon />
																		) : (
																			<VisibilityIcon />
																		)}
																	</IconButton>
																</InputAdornment>
															),
														}}
														type={
															seeNew
																? "text"
																: "password"
														}
														name="password"
														margin="dense"
														onChange={
															OnChangeInputHandle
														}
													/>
												</FormControl>
												<FormControl>
													<TextField
														label="Confirm Password"
														InputLabelProps={{
															shrink: true,
														}}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		onClick={
																			seeConfirmPass
																		}
																	>
																		{seeConfirm ? (
																			<VisibilityOffIcon />
																		) : (
																			<VisibilityIcon />
																		)}
																	</IconButton>
																</InputAdornment>
															),
														}}
														type={
															seeConfirm
																? "text"
																: "password"
														}
														name="confirmPassword"
														margin="dense"
														onChange={
															OnChangeInputHandle
														}
													/>
												</FormControl>
											</Stack>
										</Box>
									</div>

									<Stack
										direction={"row"}
										justifyContent="space-between"
									>
										<div className="mt-4">
											<button
												type="button"
												className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-error border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
												onClick={closeModal}
											>
												Cancel
											</button>
										</div>
										<div className="mt-4">
											{/* <button
												type="button"
												onClick={onSubmit}
											>
												Ok
											</button> */}
											<LoadingButton
												className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-secondaryPurple border border-transparent rounded-md hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
												loading={isLoading}
												onClick={onSubmit}
												variant="contained"
											>
												Ok
											</LoadingButton>
										</div>
									</Stack>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</Backdrop>
		</React.Fragment>
	);
}

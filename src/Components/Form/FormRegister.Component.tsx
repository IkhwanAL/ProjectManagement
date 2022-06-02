import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QueryArgRegister } from "../../types/arg.types";
import { useError } from "../../hooks/useError";
import { UserRegister } from "../../Props/User.property";
import { useRegisterMutation } from "../../redux/auth/authApi";
import classes from "../../Styles/Triangle.module.scss";
import { ErrorComp } from "../Error.Component";
import AnyModal from "../Modal/Any.Component";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useSuccess } from "../../hooks/useSuccess";

export const FormRegister = () => {
	const InitialState: QueryArgRegister & { confirmPassword: string } = {
		email: "",
		password: "",
		username: "",
		confirmPassword: "",
	};

	const [userRegister, setUserRegister] = useState<
		QueryArgRegister & { confirmPassword: string }
	>(InitialState);

	const { errorState, setErrorState } = useError({ error: false });
	const { successState, HandleControlStateSuccess, setSuccessState } =
		useSuccess({
			error: true,
		});
	const [Register, { isLoading }] = useRegisterMutation();

	const onSubmit = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!userRegister) {
			setErrorState({ error: true, msg: "Kolom Kosong" });
			return;
		}

		if (!userRegister.username || userRegister.username.length === 0) {
			setErrorState({ error: true, msg: "Username Kosong" });
			return;
		}

		if (!userRegister.email || userRegister.email.length === 0) {
			setErrorState({ error: true, msg: "Email Kosong" });
			return;
		}

		if (!userRegister.password || userRegister.password.length === 0) {
			setErrorState({ error: true, msg: "Password Kosong" });
			return;
		}

		if (
			!userRegister.confirmPassword ||
			userRegister.confirmPassword.length === 0
		) {
			setErrorState({ error: true, msg: "Confirm Password Kosong" });
			return;
		}

		if (userRegister.password !== userRegister.confirmPassword) {
			setErrorState({
				error: true,
				msg: "Password Tidak Sama Dengan Confirm Password",
			});
			return;
		}
		const { confirmPassword, ...rest } = userRegister;

		Register(rest)
			.unwrap()
			.then((_fullfilled: any) => {
				setSuccessState({
					error: !successState.error,
					head: "Success",
					msg: "Berhasil Register Cek Email Untuk Verifikasi",
				});
			})
			.catch((_err) => {
				setErrorState({
					error: true,
					msg: "Gagal Register",
				});
			});
	};

	const CloseModal = () => {
		setSuccessState({
			error: !successState.error,
			head: "",
			msg: "",
		});
	};

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		ev.preventDefault();
		const { name, value } = ev.target;
		setUserRegister({ ...userRegister, [name]: value });
	};

	const onCloseModal = () => {
		setErrorState({ ...errorState, error: false });
	};

	return (
		<div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
			<AnyModal
				isOpen={errorState.error}
				head={errorState?.head as string}
				msg={errorState?.msg as string}
				closeModal={onCloseModal}
			/>
			<AnyModal
				isOpen={!successState.error}
				head={successState?.head as string}
				msg={successState?.msg as string}
				closeModal={CloseModal}
			/>
			<form className="z-40 w-fit shadow-lg">
				<div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
					<div className="space-y-4">
						<h1 className="text-center text-2xl font-semibold text-gray-600">
							Register
						</h1>
						<div>
							<label className="block mb-1 text-gray-600 font-semibold ">
								Username
							</label>
							<input
								type="text"
								name="username"
								onChange={onChange}
								className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
							/>
						</div>
						<div>
							<label className="block mb-1 text-gray-600 font-semibold">
								Email
							</label>
							<input
								name="email"
								type="email"
								onChange={onChange}
								className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
							/>
						</div>
						<div>
							<label className="block mb-1 text-gray-600 font-semibold">
								Password
							</label>
							<input
								name="password"
								type="password"
								onChange={onChange}
								className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
							/>
						</div>
						<div>
							<label className="block mb-1 text-gray-600 font-semibold">
								Confirm Password
							</label>
							<input
								name="confirmPassword"
								type="password"
								onChange={onChange}
								className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
							/>
						</div>
					</div>
					<LoadingButton
						className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
						loading={isLoading}
						sx={{
							marginTop: 4,
							color: "#FFF",
						}}
						onClick={onSubmit}
					>
						Sign Up
					</LoadingButton>
					{/* <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
						Sign Up
					</button> */}
					<p className="items-center mt-4 mb-4 text-center">
						Already Have An Account
					</p>
					<div className="flex justify-center items-center ml-6">
						<Link
							to="/"
							className="border-2 rounded-lg font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
						>
							Sign In
						</Link>
					</div>
				</div>
			</form>
			<div>
				<div className={classes.arrowRight}></div>
			</div>
		</div>
	);
};

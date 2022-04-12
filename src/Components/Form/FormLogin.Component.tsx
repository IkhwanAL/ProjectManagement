import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { QueryArgLogin } from "../../@types/arg.types";
import { useLoginMutation } from "../../redux/user/userApi";
import { SetEmailParams, SetTokenParams } from "../../redux/user/userSlice";
import classes from "../../Styles/Triangle.module.scss";

export const FormLogin = React.memo(() => {
	const dispatch = useDispatch();
	const [Login, { data, isSuccess, isError, error, isLoading }] =
		useLoginMutation();

	const [user, setUser] = useState<QueryArgLogin>({
		email: "",
		password: "",
	});
	const [errorState, setErrorState] = useState<{
		error: boolean;
		msg?: string | null;
	}>({ error: false, msg: null });
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isSuccess) {
			dispatch(SetTokenParams(data?.data.token));
			navigate("/main/dashboard", { replace: true });
		}
	}, [isSuccess, navigate, dispatch, data?.data.token]);

	// Modal
	useEffect(() => {
		let timeoutAlert: any = null;
		if (errorState != null && errorState.error === true) {
			timeoutAlert = setTimeout(() => {
				setErrorState({ error: false, msg: errorState.msg });
			}, 3000);
		}
		return () => {
			clearTimeout(timeoutAlert);
		};
	}, [errorState]);

	React.useEffect(() => {
		if (isError) {
			setErrorState({ error: false, msg: "Terjadi Kesalahan" });
		}
	}, [isError]);

	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (Object.keys(user).length === 0) {
			setErrorState({
				error: true,
				msg: "Kolom Tidak Di isi",
			});
			return;
		}

		if (!user.email || user.email.length === 0) {
			setErrorState({ error: true, msg: "Email Kosong" });
			return;
		}

		if (!user.password || user.password.length === 0) {
			setErrorState({ error: true, msg: "Password Kosong" });
			return;
		}

		dispatch(SetEmailParams(user.email));

		Login(user).catch(console.log);
	};

	const onChangeInput = (ev: React.ChangeEvent<HTMLInputElement>): void => {
		ev.preventDefault();
		const { name, value } = ev.target;
		setUser({ ...user, [name]: value });
	};

	const setError = (): ReactElement => {
		let classAlert: string = "";
		if (errorState?.error === true) {
			classAlert = `animate-fade-in-down`;
		} else if (errorState?.error === false) {
			classAlert = `animate-fade-in-down-deep invisible`;
		} else if (errorState?.error == null) {
			classAlert = `invisible`;
		}

		return (
			<div
				className={`absolute bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 top-3 ${classAlert}`}
				role="alert"
			>
				<div className="flex">
					<svg
						className="w-5 h-5 inline mr-3"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						></path>
					</svg>
					<div>
						<span className="font-medium">{errorState?.msg}</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
			{setError()}
			<form onSubmit={onSubmit} className=" w-fit shadow-lg z-40">
				<div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
					<div className="space-y-4">
						<h1 className="text-center text-2xl font-semibold text-gray-600">
							Login
						</h1>
						<div>
							<label className="block mb-1 text-gray-600 font-semibold">
								Username
							</label>
							<input
								onChange={onChangeInput}
								type="text"
								name="email"
								className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
							/>
						</div>
						<div>
							<label className="block mb-1 text-gray-600 font-semibold">
								Password
							</label>
							<input
								onChange={onChangeInput}
								name="password"
								type="password"
								className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
							/>
						</div>
					</div>
					<button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
						{!isLoading ? (
							`Sign In`
						) : (
							<>
								<svg
									role="status"
									className="inline-block mr-2 w-4 h-4 text-gray-200 dark:text-gray-600a animate-spin"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="#1C64F2"
									/>
								</svg>
								Loading...
							</>
						)}
					</button>

					<p className="items-center mt-4 mb-4 text-center">
						Don't Have An Account
					</p>
					<div className="flex justify-center items-center ml-6">
						<Link
							to="/signup"
							className="border-2 rounded-lg font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
						>
							Sign Up
						</Link>
					</div>
				</div>
			</form>
			<div className={classes.arrowRight}></div>
		</div>
	);
});

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { QueryArgLogin } from "../../@types/arg.types";
import { ErrorMsg } from "../../@types/error.types";
import { useLoginMutation } from "../../redux/auth/authApi";
import {
	SetEmailParams,
	SetLogin,
	SetTokenParams,
} from "../../redux/user/userSlice";
import classes from "../../Styles/Triangle.module.scss";
import AnyModal from "../Modal/Any.Component";

export const FormLogin = React.memo(() => {
	const dispatch = useDispatch();
	const [Login, { data, isSuccess, isError, isLoading, error }] =
		useLoginMutation();

	const [user, setUser] = useState<QueryArgLogin>({
		email: "",
		password: "",
	});

	const [errorState, setErrorState] = useState<ErrorMsg>({ error: false });

	const navigate = useNavigate();

	if (isSuccess) {
		dispatch(SetTokenParams(data?.data?.token));
		dispatch(SetLogin(true));
		navigate("/main/dashboard", { replace: true });
	}

	// React.useEffect(() => {

	// }, [isSuccess]);

	// Modal
	useEffect(() => {
		let timeoutAlert: any = null;
		if (errorState != null && errorState.error === true) {
			timeoutAlert = setTimeout(() => {
				setErrorState({ error: false });
			}, 3000);
		}
		return () => {
			clearTimeout(timeoutAlert);
		};
	}, [errorState]);

	React.useEffect(() => {
		const err = error as { [key: string]: any };
		if (isError) {
			setErrorState({
				...errorState,
				error: true,
				head: "gagal login!",
				msg: err.data.message,
			});
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
			setErrorState({
				error: true,
				msg: "Email Kosong",
				head: "Kesalahan Data",
			});
			return;
		}

		if (!user.password || user.password.length === 0) {
			setErrorState({
				error: true,
				msg: "Password Kosong",
				head: "Kesalahan Data",
			});
			return;
		}

		dispatch(SetEmailParams(user.email));

		Login(user);
	};

	const onChangeInput = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>): void => {
			ev.preventDefault();
			const { name, value } = ev.target;
			setUser({ ...user, [name]: value });
		},
		[user]
	);

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

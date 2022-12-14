import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { QueryArgLogin } from "../../types/arg.types";
import { useError } from "../../hooks/useError";
import { useSuccess } from "../../hooks/useSuccess";
import {
	useLoginMutation,
	useRefreshLinkMutation,
} from "../../redux/auth/authApi";
import { SetEmailParams } from "../../redux/user/userSlice";
import classes from "../../Styles/Triangle.module.scss";
import AnyModal from "../Modal/Any.Component";
import { ButtonSmoll } from "../Smoll/Button";
import { Typography } from "@mui/material";

export const FormLogin = React.memo(() => {
	const dispatch = useDispatch();
	const { state } = useLocation();
	const [verify, _setVerify] = useSearchParams();
	const [Login, { data, isSuccess, isError, isLoading, error, reset }] =
		useLoginMutation();

	const [RefreshLink, RefHooks] = useRefreshLinkMutation();

	const [user, setUser] = useState<QueryArgLogin>({
		email: "",
		password: "",
	});

	const { errorState, setErrorState } = useError({ error: false });
	const { successState, setSuccessState } = useSuccess({ error: true });
	const [addLink, setLink] = useState(false);

	const navigate = useNavigate();

	React.useEffect(() => {
		if (isSuccess) {
			const url = verify.get("Url");
			const q = verify.get("_q");

			if (url === "verify") {
				navigate(`/${url}`, { replace: true, state: { q: q } });
			} else {
				navigate("/main/dashboard", { replace: true });
			}
		}
	}, [isSuccess]);

	// Verifikasi
	React.useLayoutEffect(() => {
		const outsideState = state as { [key: string]: any } | null;
		if (outsideState?.verify) {
			setSuccessState({
				error: false,
				head: "Verifikasi!",
				msg: "Verifikasi Sukses",
			});
		}
	}, []);

	// Ganti Proyek Manager
	React.useLayoutEffect(() => {
		const URL = verify.get("Url");

		if (URL === "ChangeOwner") {
			const Query = verify.get("_q");

			if (Query === "true") {
				setSuccessState({
					error: false,
					head: "Sukses !!",
					msg: "Sukses Menganti Proyek Manager",
				});
			}
		}
	}, []);

	React.useEffect(() => {
		if (RefHooks.isSuccess) {
			setSuccessState({
				error: false,
				head: "Success",
				msg: "Sukses Membuat Link Verfikasi Baru",
			});
			setLink(false);
			RefHooks.reset();
		}
	}, [RefHooks.isSuccess]);

	React.useEffect(() => {
		const err = error as { [key: string]: any };
		if (isError) {
			if (err?.data?.data?.isActive === false) {
				setLink(true);
			}

			if (err?.status === "FETCH_ERROR") {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal login!",
					msg: "Terjadi Kesalahan Pada Server",
				});
			} else {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal login!",
					msg: err.data.message ?? "Terjadi Kesalahan Pada Server",
				});
			}
		}
	}, [isError]);
	//_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
	const onSubmit = (arg: any) => {
		arg.preventDefault();
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
	const onCloseModalSuc = () => {
		setSuccessState({ ...errorState, error: true });
	};

	const refreshLink = async () => {
		try {
			await RefreshLink({ email: user.email }).unwrap();
		} catch (error) {
			setErrorState({
				error: true,
				head: "Gagal!",
				msg: "Gagal Membuat Link Verifikasi",
			});
		}
	};

	return (
		<div className="h-screen bg-gradient-to-br flex justify-center items-center w-full ">
			{/* <div className="my-5 ">
				<Typography color={"#FFF"} variant={"h5"}>
					Log In dan Menggunakan Webnya
				</Typography>

				<Typography variant={"subtitle1"} color={"#FFF"} marginX={-2}>
					Website memiliki
				</Typography>
			</div> */}
			<AnyModal
				isOpen={errorState.error}
				head={errorState?.head as string}
				msg={errorState?.msg as string}
				closeModal={onCloseModal}
			/>
			<AnyModal
				closeModal={onCloseModalSuc}
				isOpen={!successState.error}
				head={successState.head as string}
				msg={successState.msg as string}
			/>

			<form className=" shadow-lg z-40 w-fit">
				<div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
					<div className="space-y-4">
						<h1 className="text-center text-2xl font-semibold text-gray-600">
							Login
						</h1>

						<div>
							<label className="block mb-1 text-gray-600 font-semibold">
								Email
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
					{addLink ? (
						<div className="flex justify-center pt-2">
							<ButtonSmoll
								textButton="Verify account"
								fill="#FFFFFF"
								isLoading={RefHooks.isLoading}
								onClick={refreshLink}
							/>
						</div>
					) : (
						<ButtonSmoll
							textButton="SIGN IN"
							fill="#FFF"
							isLoading={isLoading}
							onClick={onSubmit}
						/>
					)}

					<p className="items-center mt-4 mb-4 text-center">
						Tidak Punya Akun?
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

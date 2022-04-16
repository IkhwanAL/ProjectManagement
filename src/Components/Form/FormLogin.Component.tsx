import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { QueryArgLogin } from "../../@types/arg.types";
import { useError } from "../../hooks/useError";
import { useSuccess } from "../../hooks/useSuccess";
import {
	useLoginMutation,
	useRefreshLinkMutation,
} from "../../redux/auth/authApi";
import {
	SetEmailParams,
	SetLogin,
	SetTokenParams,
} from "../../redux/user/userSlice";
import classes from "../../Styles/Triangle.module.scss";
import AnyModal from "../Modal/Any.Component";
import { ButtonSmoll } from "../Smoll/Button";

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
	console.log(isLoading, RefHooks.isLoading);
	const navigate = useNavigate();

	if (isSuccess) {
		const url = verify.get("Url");
		const q = verify.get("_q");

		if (url) {
			navigate(`/${url}`, { replace: true, state: { q: q } });
		} else {
			dispatch(SetTokenParams(data?.data?.token));
			dispatch(SetLogin(true));
			navigate("/main/dashboard", { replace: true });
		}
	}

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
	// console.log(error);
	React.useEffect(() => {
		const err = error as { [key: string]: any };
		if (isError) {
			console.log(err, "errro");
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
	}, [isError, error]);

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
		<div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
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
							textButton="Sign In"
							fill="#FFF"
							isLoading={isLoading}
							onClick={onSubmit}
						/>
					)}

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

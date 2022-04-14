import React, { useLayoutEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ButtonSmoll } from "../Components/Smoll/Button";
import { useVerifyMutation } from "../redux/auth/authApi";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

export const RedirectToVerify = () => {
	const [Verify, { isSuccess, isLoading, data, isError }] =
		useVerifyMutation();
	const [verify, _setVerify] = useSearchParams();
	const navigation = useNavigate();

	useLayoutEffect(() => {
		if (isSuccess) {
			navigation("/main/dashboard", { replace: true });
		}
	}, [isSuccess]);

	// const location = useLocation();
	useLayoutEffect(() => {
		if (isError) {
			alert("error");
		}
	}, [isError]);
	const onOk = () => {
		const q = verify.get("_q") as string;

		Verify({ q: q }).unwrap().catch(console.log);
	};

	const onCancel = () => {
		navigation("/", { replace: true });
	};
	return (
		<React.Fragment>
			<div className="wrapper bg-blue-500 h-screen shadow-sm">
				<div className="flex justify-center items-center h-screen">
					{/* Card */}
					<div className="max-w-sm rounded shadow-lg bg-gray-100">
						{/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
						<div className="px-6 py-6">
							<div className="font-bold text-xl mb-2">
								Verify Account
							</div>
							<p className="text-gray-700 text-base">
								This is A Verification Account.
								<br />
								Click Ok The Verify Your Account
							</p>
						</div>
						<Stack
							direction={"row"}
							paddingX={4}
							paddingTop={4}
							paddingBottom={2}
							justifyContent="space-between"
						>
							{/* {isLoading ? (
								<LoadingButton></LoadingButton>
							) : (
								<Button color="primary" variant="contained">
									Ok
								</Button>
							)} */}
							<LoadingButton
								color="primary"
								variant="contained"
								loading={isLoading}
								onClick={onOk}
							>
								Ok
							</LoadingButton>
							<Button
								color="error"
								variant="contained"
								onClick={onCancel}
							>
								Cancel
							</Button>
						</Stack>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

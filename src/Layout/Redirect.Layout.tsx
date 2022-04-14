import React from "react";
import { useLocation } from "react-router-dom";

export const RedirectToVerify = () => {
	const location = useLocation();
	console.log(location);
	return (
		<React.Fragment>
			<div className="wrapper bg-blue-500 h-screen">
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
						<div className="flex px-6 pt-4 pb-2 justify-between">
							<button className="bg-blue-400 hover:bg-blue-700 rounded text-white px-4 py-2">
								Ok
							</button>
							<button className="bg-red-600 hover:bg-red-500 rounded text-white px-4 py-2">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

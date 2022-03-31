import React from "react";
import { Link } from "react-router-dom";

export const VerifyPage = () => {
	return (
		// <React.Fragment>
		<div className="h-screen w-screen flex justify-center items-center border-1 border-gray-600">
			{/* <div className=""> */}
			<div className="max-w-sm rounded overflow-hidden shadow-lg border-1 border-gray-300">
				{/* <img
					className="w-full"
					src="/img/card-top.jpg"
					alt="Sunset in the mountains"
				/> */}
				<h2 className="text-center mt-2">UNDANGAN</h2>
				<div className="px-6 py-4">
					{/* <div className="font-bold text-xl mb-2">
						Unda
					</div> */}
					<p className="text-gray-700 text-base">
						Kamu Di undang Oleh <i>Nama User</i> Ke Proyek{" "}
						<i>Nama Proyek</i>
					</p>
				</div>
				<div className="flex px-6 pt-4 pb-2 justify-between bottom-0">
					{/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#photography
					</span>
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#travel
					</span>
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#winter
					</span> */}

					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Ya
					</button>
					<Link
						to={"/main/dashboard"}
						replace={true}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Tidak
					</Link>
				</div>
			</div>
			{/* </div> */}
		</div>
		// </React.Fragment>
	);
};

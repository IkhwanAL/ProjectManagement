// import React from "react";
// import { useSelector } from "react-redux";
// import { user } from "../../@types/database.types";
// import { ModalPropsUI } from "../../Props/Modal.property";
// import { useGetUserByIdQuery } from "../../redux/user/userApi";
// import { userSelector } from "../../redux/user/userSlice";

// export default function FormUserUI({ setModal }: ModalPropsUI) {
// 	const { data } = useGetUserByIdQuery(null, {
// 		refetchOnReconnect: true,
// 	});
// 	const [user, setUser] = React.useState<user>();
// 	React.useEffect(() => {
// 		if (data) {
// 			setUser({
// 				phoneNumber: data.data?.phoneNumber,
// 				firstName: data.data?.firstName,
// 				lastName: data.data?.lastName,
// 				username: data.data?.username,
// 				email: data.data?.email,
// 				id: data.data?.id,
// 			});
// 		}
// 	}, []);

// 	return (
// 		<>
// 			<div className="m-10">
// 				<div className="border-y-1 border-black"></div>
// 				<div className="grid grid-cols-6 gap-6 mt-5 mb-5">
// 					<div className="col-span-6 sm:col-span-3">
// 						<label
// 							htmlFor="first-name"
// 							className="block text-md font-medium text-gray-700"
// 						>
// 							First name
// 						</label>
// 						<input
// 							type="text"
// 							name="first-name"
// 							id="first-name"
// 							value={user?.firstName as string}
// 							// autoComplete="given-name"
// 							className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
// 						/>
// 					</div>
// 					<div className="col-span-6 sm:col-span-3">
// 						<label
// 							htmlFor="last-name"
// 							className="block text-md font-medium text-gray-700"
// 						>
// 							Last name
// 						</label>
// 						<input
// 							type="text"
// 							name="last-name"
// 							id="last-name"
// 							autoComplete="family-name"
// 							className="mt-1 p-2 focus:ring-indigo-500 border-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
// 							value={user?.lastName as string}
// 						/>
// 					</div>
// 				</div>
// 				<div className="grid grid-cols-6 gap-6 mt-5 mb-5">
// 					<div className="col-span-6 sm:col-span-4">
// 						<label
// 							htmlFor="username"
// 							className="block text-md font-medium text-gray-700"
// 						>
// 							Username
// 						</label>
// 						<input
// 							type="text"
// 							name="username"
// 							id="usernameId"
// 							className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md focus:ring-indigo-500"
// 							value={user?.username as string}
// 						/>
// 					</div>

// 					<div className="col-span-6 sm:col-span-4">
// 						<label
// 							htmlFor="username"
// 							className="block text-md font-medium text-gray-700"
// 						>
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							name="email"
// 							id="email"
// 							value={user?.email as string}
// 							className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md focus:ring-indigo-500"
// 						/>
// 					</div>
// 				</div>
// 				<div className="col-span-4 sm:col-span-2 mb-2">
// 					<label
// 						htmlFor="username"
// 						className="block text-md font-medium text-gray-700"
// 					>
// 						Phone Number
// 					</label>
// 					<input
// 						type="text"
// 						name="username"
// 						id="usernameId"
// 						value={user?.phoneNumber as string}
// 						className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md focus:ring-indigo-500"
// 					/>
// 				</div>
// 				<div className="border-y-1 border-gray-500"></div>

// 				<div className="grid grid-cols-6 mt-5 mb-5 gap-6">
// 					<button className="col-span-1 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-80 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
// 						Change Password
// 					</button>
// 					<button className="col-span-1 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
// 						Delete User
// 					</button>
// 				</div>

// 				<div className="flex justify-between">
// 					<div className="bg-gray-50 text-right mt-5">
// 						<button
// 							onClick={setModal}
// 							type="button"
// 							className="inline-flex justify-center px-4 py-2 border-1 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 bg-opacity-80 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
// 						>
// 							Close
// 						</button>
// 					</div>
// 					<div className="bg-gray-50 text-right mt-5">
// 						<button
// 							type="submit"
// 							className="inline-flex justify-center px-4 py-2 border-1 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// 						>
// 							Save
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }
export {};

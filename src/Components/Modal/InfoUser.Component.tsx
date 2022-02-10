import { ReactElement } from "react";
import { ModalProps } from "../../Props/Modal.property";
const InfoModal = ({ setModal, modal }: ModalProps): ReactElement => {
	return (
		<>
			{/* <div className="flex justify-center h-screen items-center bg-gray-200 antialiased absolute"> */}
			<div
				className={`flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl absolute z-50`}
			>
				<div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
					<p className="font-semibold text-gray-800">Add a step</p>
					<button className="hover:shadow-sm rounded-md hover:shadow-gray-400">
						<svg
							onClick={setModal}
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
				<div className="flex flex-col px-6 py-5 bg-gray-50">
					<p>Info Pengguna</p>
				</div>
				<div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
					<button className="px-4 py-2 text-white font-semibold rounded hover:border-[1px] hover:border-blue-500">
						<p className="font-semibold text-gray-600">Cancel</p>
					</button>
					<button className="px-4 py-2 text-white font-semibold bg-blue-500 rounded">
						Save
					</button>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};

export default InfoModal;

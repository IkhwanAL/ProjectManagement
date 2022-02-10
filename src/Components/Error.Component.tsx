import { ReactElement } from "react";
import { ErrorMsg } from "../Props/Error.property";

export const ErrorComp = (error: ErrorMsg): ReactElement => {
	if (!error.error) {
		return <></>;
	}
	let classAlert: string = "";
	if (error?.error === true) {
		classAlert = `animate-fade-in-down`;
	} else if (error?.error === false) {
		classAlert = `animate-fade-in-down-deep invisible`;
	} else if (error?.error == null) {
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
					<span className="font-medium">{error?.msg}</span>
				</div>
			</div>
		</div>
	);
};

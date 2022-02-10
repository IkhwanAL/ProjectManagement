import { modalStore } from "../../store/modal.store";

export default function FormUserUI() {
	const onClickClose = () => {
		modalStore.changeValue(!modalStore.initValue);
	};
	return (
		<>
			<div className="m-10">
				<div className="grid grid-cols-6 gap-6">
					<div className="col-span-6 sm:col-span-3">
						<label
							htmlFor="first-name"
							className="block text-md font-medium text-gray-700"
						>
							First name
						</label>
						<input
							type="text"
							name="first-name"
							id="first-name"
							// autoComplete="given-name"
							className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div className="col-span-6 sm:col-span-3">
						<label
							htmlFor="last-name"
							className="block text-md font-medium text-gray-700"
						>
							Last name
						</label>
						<input
							type="text"
							name="last-name"
							id="last-name"
							autoComplete="family-name"
							className="mt-1 p-2 focus:ring-indigo-500 border-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="bg-gray-50 text-right mt-5">
						<button
							onClick={onClickClose}
							type="submit"
							className="inline-flex justify-center px-4 py-2 border-1 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Close
						</button>
					</div>
					<div className="bg-gray-50 text-right mt-5">
						<button
							type="submit"
							className="inline-flex justify-center px-4 py-2 border-1 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

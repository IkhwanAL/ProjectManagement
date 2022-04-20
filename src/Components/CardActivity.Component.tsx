import { ActProject } from "../types/project.types";

export const CardActivities = ({ handleShow, name, progress }: ActProject) => {
	return (
		<>
			<div className="bg-white p-3 mt-5 rounded-xl">
				<div className="flex justify-between">
					<h4 className="font-bold">Create UI/UX</h4>
					<button onClick={handleShow}>Edit</button>
				</div>
				<p className="text-gray-600">{name}</p>

				<div className="mt-3">
					<p className="text-gray-600 mb-2">Progress</p>
					<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
						<div className="bg-blue-600 h-2.5 rounded-full w-1/2">
							{progress}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

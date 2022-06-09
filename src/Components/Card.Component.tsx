import React from "react";

import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetIdProyek } from "../redux/project/projectSlice";
import { PReturn } from "../types/database.types";

const CardProject = (project: PReturn & { recent: boolean }) => {
	const link = project.recent
		? `project/detail/${project.projectId}`
		: `detail/${project.projectId}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [idProyek, setIdProyek] = React.useState<number>();

	const OnHandleProyek = (id: number) => {
		dispatch(SetIdProyek(id));
		navigate(link, { replace: false });
	};

	return (
		<div className="text-black max-w-md w-80 my-auto mx-auto ml-5 mr-5 mt-5 mb-5 bg-white p-4 py-5 px-5 rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-400 ">
			<button
				onClick={() => OnHandleProyek(project.projectId)}
				className="w-full"
			>
				<div className="flex justify-between">
					<div>
						<h2 className="text-lg">{project.projectName} </h2>
					</div>
				</div>
				<div className="mt-5 flex justify-between items-center flex-col w-52">
					<p>Deskripsi</p>
					<span>{project.projectDescription}</span>
				</div>
				<div className="flex justify-between mt-5 w-full">
					<div>
						<h3 className="text-xs"> Pemilik </h3>
						<p className="font-bold"> {project.user.username} </p>
					</div>
					<div>
						<h3 className="text-xs mr-auto"> Batas Pengerjaan </h3>
						<p className="font-bold">
							{project.deadline
								? moment(project.deadline).format("LL")
								: " "}
						</p>
					</div>
				</div>
			</button>
		</div>
	);
};

export default CardProject;

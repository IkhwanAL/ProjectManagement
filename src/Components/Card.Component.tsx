import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetIdProyek } from "../redux/project/projectSlice";
import { PReturn } from "../types/database.types";
import { useDeleteProjectMutation } from "../redux/project/projectApi";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 5,
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

const CardProject = (project: PReturn & { recent: boolean }) => {
	const link = project.recent
		? `project/detail/${project.projectId}`
		: `detail/${project.projectId}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);
	// const [idProyek, setIdProyek] = React.useState<number>();

	const OnHandleProyek = (id: number) => {
		dispatch(SetIdProyek(id));
		navigate(link, { replace: false });
	};

	const OpeningModal = (idProyek?: number) => {
		setOpen((prev) => !prev);
		// setIdProyek(idProyek);
	};

	return (
		<div className="text-black max-w-md w-80 my-auto mx-auto ml-5 mr-5 mt-5 mb-5 bg-white p-4 py-5 px-5 rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-400 ">
			<button
				onClick={() => OnHandleProyek(project.projectId)}
				className="w-full"
			>
				<div className="flex justify-between">
					<div>
						<h2 className="text-lg"> {project.projectName} </h2>
					</div>
					<div className="flex items-center ">
						<div className="pb-5 pl-5 bg-opacity-40 rounded-full w-14 h-14 -ml-10">
							<img
								src="https://ui-avatars.com/api/?name=Ikhwan"
								className="w-full h-full rounded-full border-1 border-primary"
								alt="User"
							/>
						</div>
						<div className="pb-5 pl-5 bg-opacity-30 rounded-full w-14 h-14 -ml-9 ">
							<img
								src="https://ui-avatars.com/api/?name=Ananda"
								className="w-full h-full rounded-full border-1 border-primary"
								alt="User"
							/>
						</div>
						<div className="pb-5 pl-5  bg-opacity-30 rounded-full w-14 h-14 -ml-8 ">
							<img
								src="https://ui-avatars.com/api/?name=Abi"
								className="w-full h-full rounded-full border-1 border-primary"
								alt="User"
							/>
						</div>
					</div>
				</div>
				<div className="mt-5 flex justify-between items-center w-52">
					<span>{project.projectDescription}</span>
				</div>
				<div className="flex justify-between mt-5 w-full">
					<div>
						<h3 className="text-xs"> Owner </h3>
						<p className="font-bold"> {project.user.username} </p>
					</div>
					<div>
						<h3 className="text-xs mr-auto"> Due Date </h3>
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

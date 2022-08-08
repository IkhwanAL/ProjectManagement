import React from "react";

import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetIdProyek } from "../redux/project/projectSlice";
import { PReturn } from "../types/database.types";
import { Box, Stack, Typography } from "@mui/material";

const CardProject = (project: PReturn & { recent: boolean }) => {
	const link = project.recent
		? `project/detail/${project.projectId}`
		: `detail/${project.projectId}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const OnHandleProyek = (id: number) => {
		dispatch(SetIdProyek(id));
		navigate(link, { replace: false });
	};

	const [borderColor, setBorderColor] = React.useState<string>("");

	React.useLayoutEffect(() => {
		const overdue = moment().toDate() > moment(project.deadline).toDate();
		const complete = project.projectactivity.every(
			(x) => x.progress === 100
		);

		if (complete) {
			setBorderColor("border-green-600");
			return;
		}

		if (overdue) {
			setBorderColor("border-red-500");
			return;
		}
	}, []);

	return (
		<div
			className={`text-black w-80 h-70 max-w-md my-auto mx-auto ml-5 mr-5 mt-5 mb-5 bg-white p-4 py-5 px-5 rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-400 border-2 ${borderColor}`}
		>
			<button
				onClick={() => OnHandleProyek(project.projectId)}
				className="w-full"
			>
				<Stack
					direction={"column"}
					spacing={{
						xs: 1,
						sm: 4,
						md: 6,
						lg: 6,
					}}
				>
					<Typography variant="h6">{project.projectName}</Typography>
					<Typography
						height={45}
						sx={{
							display: "-webkit-box",
							overflow: "hidden",
							textOverflow: "ellipsis",
							WebkitLineClamp: "2",
							WebkitBoxOrient: "vertical",
						}}
					>
						{project.projectDescription}
					</Typography>
					<Box
						sx={{
							width: 1,
						}}
					>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
						>
							<Stack direction={"column"} alignItems={"center"}>
								<Typography>Pemilik</Typography>
								<Typography
									variant="subtitle1"
									fontWeight={"700"}
								>
									{project.user.username}
								</Typography>
							</Stack>

							<Stack>
								<Typography>Batas Pengerjaan</Typography>
								<Typography fontWeight={"700"}>
									{project.deadline
										? moment(project.deadline)
												.locale("id")
												.format("LL")
										: " "}
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Stack>
				{/* <div className="flex justify-between">
					<div>
						<h2 className="text-lg"> </h2>
					</div>
				</div>
				<div className="mt-5 flex justify-between items-center w-52">
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
				</div> */}
			</button>
		</div>
	);
};

export default CardProject;

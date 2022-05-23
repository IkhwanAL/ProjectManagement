import {
	LinearProgress,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Draggable } from "react-beautiful-dnd";
import { ActProject } from "../types/project.types";
import { FormKegiatan } from "../Components/Form/KegiatanForm.Component";

export const CardActivities = ({
	isOpen,
	handleShow,
	name,
	progress,
	description,
	projectActivityId,
	ActivtyName,
	OnDelete,
}: ActProject & { ActivtyName: string; OnDelete: (arg?: any) => void }) => {
	return (
		<>
			<Draggable
				draggableId={"" + projectActivityId}
				index={projectActivityId}
			>
				{(provided, snapshot) => (
					<div
						className="bg-white p-3 mt-5 rounded-xl"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className="flex justify-between">
							<Typography
								component="h4"
								fontWeight={"700"}
								variant="inherit"
							>
								{name}
							</Typography>
							<Stack direction={"row"}>
								<button
									onClick={() => {
										if (handleShow) {
											handleShow(
												ActivtyName,
												projectActivityId
											);
										}
									}}
								>
									Edit
								</button>
								<button
									onClick={() => {
										OnDelete(projectActivityId);
									}}
									className="mx-3 text-red-500"
								>
									Delete
								</button>
							</Stack>
						</div>
						{/* <span className="text-gray-600 "> */}
						<Typography noWrap color="gray">
							{description}
						</Typography>
						{/* </span> */}

						<div className="mt-3">
							<span className="text-gray-600 mb-2">Progress</span>
							{/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
						<LinearProgress
							variant="determinate"
							value={progress}
						/>
					</div> */}
							<Box sx={{ width: "100%" }}>
								<Stack
									direction="row"
									justifyContent="space-between"
								>
									<LinearProgress
										sx={{
											borderRadius: 10,
											height: 10,
											width: "86%",
										}}
										variant="determinate"
										value={progress}
									/>
									{/* <Typography>{progress ?? 0}</Typography> */}
								</Stack>
							</Box>
						</div>
					</div>
				)}
			</Draggable>
		</>
	);
};

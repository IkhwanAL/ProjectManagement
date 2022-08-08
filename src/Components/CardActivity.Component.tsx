import { LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { ActProject } from "../types/project.types";

export const CardActivities = ({
	isOpen,
	handleShow,
	name,
	progress,
	description,
	projectActivityId,
	ActivtyName,
	critical,
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
						className={`bg-white p-3 mt-5 rounded-xl border-2 border-solid ${
							critical ? "border-red-500" : ""
						}`}
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
						<Typography noWrap color="gray">
							{description}
						</Typography>

						<div className="mt-3">
							<span className="text-gray-600 mb-2">Progress</span>
							<Box sx={{ width: "100%" }}>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems={"baseline"}
								>
									<LinearProgress
										sx={{
											borderRadius: 10,
											height: 10,
											width: "80%",
										}}
										variant="determinate"
										value={progress}
									/>
									<Typography>
										{progress
											? `${Math.floor(progress) + "%"}`
											: `${0}%`}
									</Typography>
								</Stack>
							</Box>
						</div>
					</div>
				)}
			</Draggable>
		</>
	);
};

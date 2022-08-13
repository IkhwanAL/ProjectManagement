import React from "react";
import { Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { ActProject } from "../types/project.types";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import DoneIcon from "@mui/icons-material/Done";
import moment from "moment";
var idLocale = require("moment/locale/id");

export const CardActivities = ({
	isOpen,
	handleShow,
	name,
	progress,
	description,
	projectActivityId,
	ActivtyName,
	critical,
	stats,
	timeDate,
	f,
	OnDelete,
}: ActProject & { ActivtyName: string; OnDelete: (arg?: any) => void }) => {
	moment.locale("id", idLocale);
	const [activasion, setActivasion] = React.useState({
		activeStart: false,
		activeEnd: false,
		activeOverDue: false,
		activeFinish: false,
	});

	React.useEffect(() => {
		if (stats === "START") {
			setActivasion((prev) => ({
				...prev,
				activeStart: true,
			}));
		}

		if (stats === "END") {
			setActivasion((prev) => ({
				...prev,
				activeEnd: true,
			}));
		}

		if (progress === 100) {
			setActivasion((prev) => ({
				...prev,
				activeFinish: true,
				activeOverDue: false,
			}));
		}

		if (moment().toDate() > moment(timeDate).toDate()) {
			if (progress < 100) {
				setActivasion((prev) => ({
					...prev,
					activeFinish: false,
					activeOverDue: true,
				}));
			}
		}
	}, [stats, timeDate, progress]);

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
						<Stack
							mt={1}
							direction={"row"}
							spacing={2}
							flexWrap={"wrap"}
						>
							{activasion.activeStart === true ? (
								<Chip
									label="Aktifitas Pertama"
									icon={<InfoIcon />}
								/>
							) : (
								<></>
							)}
							{activasion.activeEnd === true ? (
								<Chip
									label="Aktifitas Terakhir"
									icon={<InfoIcon />}
								/>
							) : (
								<></>
							)}
							{activasion.activeOverDue === true ? (
								<Chip
									label="Overdue"
									icon={<WarningIcon />}
									color={"error"}
								/>
							) : (
								<></>
							)}
							{activasion.activeFinish === true ? (
								<Chip
									label="Finish"
									icon={<DoneIcon />}
									color="success"
								/>
							) : (
								<></>
							)}
						</Stack>
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
								<Stack
									direction={"row"}
									mt={2}
									justifyContent={"space-between"}
								>
									<Typography>Waktu Rentan</Typography>
									<Typography>Slack Time</Typography>
								</Stack>
								<Stack
									direction={"row"}
									justifyContent={"space-between"}
								>
									<Typography>
										{timeDate
											? moment(timeDate).format("LL")
											: "-"}
									</Typography>
									<Typography>{f ?? "-"}</Typography>
								</Stack>
							</Box>
						</div>
					</div>
				)}
			</Draggable>
		</>
	);
};

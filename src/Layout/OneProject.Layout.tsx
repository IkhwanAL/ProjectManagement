import { useNavigate, useParams } from "react-router-dom";
import { useLazyRefreshTokenQuery } from "../redux/auth/authApi";
import React, { useState } from "react";
import {
	useGetOneProjectActQuery,
	useMoveActivityPositionMutation,
} from "../redux/projectActivity/projectActivityApi";
import { projectactivity_position } from "../types/database.types";
import { ProjectActicityForState } from "../types/project.types";
import { GridPosition } from "../Components/PositionGrid.Component";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useError } from "../hooks/useError";
import { MoveStateReturn } from "../interface/proyek.interface";
import { FormKegiatan } from "../Components/Form/KegiatanForm.Component";
import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
export interface StateActivityProject {
	[key: string]: Array<ProjectActicityForState>;
}

export const OneProject = () => {
	const { idProject } = useParams();
	const navigate = useNavigate();
	const {
		data,
		isFetching,
		isSuccess,
		isError,
		error,
		refetch,
		currentData,
	} = useGetOneProjectActQuery(
		{ idProject: parseInt(idProject as string) },
		{
			refetchOnMountOrArgChange: true,
		}
	);

	const [triggerRefresh] = useLazyRefreshTokenQuery();
	const [Move] = useMoveActivityPositionMutation();
	const [open, setOpen] = useState(false);
	const { errorState, setErrorState } = useError({ error: false });
	const ActivityName = React.useRef("");
	const [IdProjectAct, setIdProjectAct] = React.useState<
		number | undefined
	>();

	const intialState: StateActivityProject = {
		To_Do: [],
		Doing: [],
		Review: [],
		Done: [],
	};

	const [positionData, setPositionData] = React.useState(intialState);

	const handleShow = (name: string, idProjectActivityId?: number) => {
		ActivityName.current = name;
		if (idProjectActivityId) {
			setIdProjectAct(idProjectActivityId);
		} else {
			setIdProjectAct(undefined);
		}
		setOpen((prev) => !prev);
	};

	React.useEffect(() => {
		if (isSuccess || !isFetching) {
			const d =
				currentData?.data?.projectactivity ||
				data?.data?.projectactivity;

			let payload: StateActivityProject = {
				To_Do: [],
				Doing: [],
				Review: [],
				Done: [],
			};

			if (d) {
				for (const iterator of d) {
					payload[iterator.position].push(iterator);
				}

				setPositionData(payload);
			}
		}
	}, [isSuccess, isFetching]);

	React.useEffect(() => {
		const err = error as { [key: string]: any };
		if (isError) {
			if (err?.status === "FETCH_ERROR") {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal Membuat Proyek baru",
					msg: "Terjadi Kesalahan Pada jaringan",
				});
			} else if (err?.data?.data?.name === "TokenExpire") {
				triggerRefresh(null, true)
					.unwrap()
					.then(() => {
						refetch();
					})
					.catch(() => {
						setErrorState({
							error: true,
							head: "Gagal Memperbarui Data",
							msg: "Terjadi Kesalahan Pada Server",
							action: () => navigate("/", { replace: true }),
						});
					});
			} else {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal Membuat Proyek baru",
					msg: err.data.message ?? "Terjadi Kesalahan Pada Server",
				});
			}
		}
	}, [isError]);

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (!source) {
			return;
		}

		if (
			destination.droppableId === source.droppableId ||
			destination.index === source.index
		) {
			return;
		}

		// Cari Data
		const sourceData = positionData[source.droppableId].filter(
			(x) => x.projectActivityId === source.index
		)[0];

		const payload = {
			projectActivityId: sourceData.projectActivityId,
			position: destination.droppableId,
		} as MoveStateReturn;

		setPositionData((prev) => ({
			...prev,
			[destination.droppableId]: [
				sourceData,
				...prev[destination.droppableId],
			],
		}));

		setPositionData((prev) => ({
			...prev,
			[source.droppableId]: prev[source.droppableId].filter(
				(x) => x.projectActivityId !== source.index
			),
		}));

		if (destination.droppableId !== source.droppableId) {
			Move(payload)
				.unwrap()
				.then(() => {})
				.catch((err) => {
					setPositionData((prev) => ({
						...prev,
						[source.droppableId]: [
							...prev[source.droppableId],
							sourceData,
						],
					}));

					setPositionData((prev) => ({
						...prev,
						[destination.droppableId]: prev[
							destination.droppableId
						].filter((x) => x.projectActivityId !== source.index),
					}));
				});
		}
	};

	return (
		<>
			<FormKegiatan
				idProjectActivity={IdProjectAct}
				handleShow={handleShow}
				ActivityName={ActivityName.current}
				isOpen={open}
			/>
			<DragDropContext onDragEnd={onDragEnd}>
				{isFetching ? (
					<Box
						sx={{
							marginTop: -2,
						}}
					>
						<LinearProgress />
					</Box>
				) : (
					<></>
				)}
				<div className="w-full h-screen mx-auto">
					<Box
						sx={{
							marginX: 2,
						}}
					>
						<Stack direction={"row"} alignItems={"baseline"}>
							<Typography component={"p"} fontSize={16}>
								Label:
							</Typography>
							<Chip
								variant="outlined"
								label="Aktifitas Kritikal"
								color="error"
								sx={{
									marginX: 1,
									backgroundColor: "#FFF",
									color: "#000",
									// borderWidth: 1,
									// borderColor: "red",
								}}
							/>
						</Stack>
					</Box>
					<div className="lg:grid lg:grid-cols-4 md:flex md:flex-col sm:flex sm:flex-col">
						{/* Start To Do */}
						<GridPosition
							handleShow={handleShow}
							positionName={projectactivity_position.To_Do}
							positionDesc="To Do"
							positionData={positionData.To_Do}
							key={"A"}
						/>
						{/* End Todo */}
						{/* Start Doing */}
						<GridPosition
							handleShow={handleShow}
							positionName={projectactivity_position.Doing}
							positionDesc={"Doing"}
							positionData={positionData.Doing}
							key={"B"}
						/>
						{/* End Doing */}
						{/* Start Review */}
						<GridPosition
							handleShow={handleShow}
							positionName={projectactivity_position.Review}
							positionDesc={"Review"}
							positionData={positionData.Review}
							key={"C"}
						/>
						{/* End Review */}
						{/* Start Done */}
						<GridPosition
							handleShow={handleShow}
							positionName={projectactivity_position.Done}
							positionDesc={"Done	"}
							positionData={positionData.Done}
							key={"D"}
						/>
						{/* End Done */}
					</div>
				</div>
			</DragDropContext>
		</>
	);
};

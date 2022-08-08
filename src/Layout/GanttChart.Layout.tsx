import React from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { ProjectActApi } from "../redux/projectActivity/projectActivityApi";
import { useGetStartDateQuery } from "../redux/project/projectApi";
import { ReformatDataForGoogleCharts } from "../Util/ReformatDataToRowsOfGoogleChart";
import { useTheme } from "@mui/material/styles";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import moment from "moment";

interface GanttOptions {
	height?: number;
	gantt?: {
		arrow?: {
			angle?: number;
			color: string;
			length?: number;
		};
		defaultStartDate?: number | Date;
		trackHeight?: number;
		labelMaxWidth?: number;
		criticalPathEnabled?: boolean;
		criticalPathStyle?: {
			stroke?: string;
			strokeWidth?: number;
		};
		labelStyle?: { [key: string]: string | number };
		barCornerRadius?: number;
		barHeight?: number;
	};
}

export default function GanttChart() {
	const { idProject } = useParams();
	const theme = useTheme();
	const trackHeight = 50;

	const GetStartDate = useGetStartDateQuery(idProject as string, {
		refetchOnMountOrArgChange: true,
	});
	const { isSuccess, isFetching, data } =
		ProjectActApi.endpoints.GetAllActivity.useQuery(idProject, {
			refetchOnMountOrArgChange: true,
		});

	const [options, setOptions] = React.useState<GanttOptions>({
		// height: 300 * trackHeight,
		gantt: {
			arrow: {
				angle: 20,
				color: theme.palette.primary.main,
				length: 8,
			},
			criticalPathEnabled: true,
			criticalPathStyle: {
				strokeWidth: 1.4,
			},
			barCornerRadius: 10,
			labelStyle: {
				marginTop: 10,
			},
		},
	});

	const [showsData, setShowsData] =
		React.useState<Array<Array<string | number>>>();

	React.useLayoutEffect(() => {
		if (isSuccess && !isFetching) {
			if (data) {
				setShowsData(ReformatDataForGoogleCharts(data));
			}
		}
	}, [isSuccess, isFetching]);

	const columns: Array<{ type: string; label: string }> = [
		{ type: "string", label: "Task ID" },
		{ type: "string", label: "Task Name" },
		{ type: "date", label: "Start Date" },
		{ type: "date", label: "End Date" },
		{ type: "number", label: "Duration" },
		{ type: "number", label: "Percent Complete" },
		{ type: "string", label: "Dependencies" },
	];

	React.useLayoutEffect(() => {
		if (GetStartDate.isSuccess && !GetStartDate.isFetching) {
			// if (GetStartDate.data) {
			setOptions((prev) => ({
				...prev,
				gantt: {
					...prev.gantt,
					defaultStartDate: +moment(GetStartDate.data).format("x"),
					// defaultStartDate: moment(GetStartDate.data).toDate(),
					trackHeight: trackHeight,
				},
				height: (showsData?.length ?? 15) * trackHeight,
			}));
			// }
		}

		return () => {};
	}, [GetStartDate.isSuccess, GetStartDate.isFetching]);

	return (
		<>
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
			{showsData && showsData?.length !== 0 ? (
				// <Box>ASD</Box>
				<Chart
					chartType="Gantt"
					width="100%"
					data={[columns, ...showsData]}
					options={{
						...options,
						legend: { position: "bottom" },
						title: "Gantt Chart",
					}}
					style={{
						marginTop: 20,
					}}
					chartLanguage="id"
				/>
			) : (
				<>
					<Box>
						<Stack direction={"row"} justifyContent="center">
							<Typography>
								Tidak Ada Gantt Chart, Mohon Untuk Mengisi
								Kegiatan Aktifitas
							</Typography>
						</Stack>
					</Box>
				</>
			)}
		</>
	);
}

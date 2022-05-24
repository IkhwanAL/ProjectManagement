import React from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { ProjectActApi } from "../redux/projectActivity/projectActivityApi";
import { useGetStartDateQuery } from "../redux/project/projectApi";
import { ReformatDataForGoogleCharts } from "../Util/ReformatDataToRowsOfGoogleChart";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

interface GanttOptions {
	height: number;
	gantt: {
		arrow?: {
			color: string;
		};
		defaultStartDate: number;
	};
}

export default function GanttChart() {
	const { idProject } = useParams();
	const theme = useTheme();

	const GetStartDate = useGetStartDateQuery(idProject as string, {
		refetchOnMountOrArgChange: true,
	});
	const { isSuccess, isFetching, data } =
		ProjectActApi.endpoints.GetAllActivity.useQuery(idProject, {
			refetchOnMountOrArgChange: true,
		});

	const [options, setOptions] = React.useState<GanttOptions>({
		height: 400,
		gantt: {
			arrow: {
				color: theme.palette.primary.main,
			},
			defaultStartDate: new Date().getTime(),
		},
	});

	const [showsData, setShowsData] =
		React.useState<Array<Array<string | number>>>();

	React.useEffect(() => {
		if (isSuccess && !isFetching) {
			if (data) {
				setShowsData(ReformatDataForGoogleCharts(data));
			}
		}
	}, [isSuccess, isFetching]);

	function daysToMilliseconds(days: number) {
		return days * 24 * 60 * 60 * 1000;
	}

	const columns: Array<{ type: string; label: string }> = [
		{ type: "string", label: "Task ID" },
		{ type: "string", label: "Task Name" },
		{ type: "date", label: "Start Date" },
		{ type: "date", label: "End Date" },
		{ type: "number", label: "Duration" },
		{ type: "number", label: "Percent Complete" },
		{ type: "string", label: "Dependencies" },
	];

	React.useEffect(() => {
		if (GetStartDate.isSuccess || !GetStartDate.isFetching) {
			if (GetStartDate.data) {
				const time = new Date(GetStartDate.data);

				const StartDate = [
					time.getFullYear(),
					time.getMonth() + 1,
					time.getDate(),
				];

				setOptions((prev) => ({
					...prev,
					gantt: {
						defaultStartDate: new Date(
							StartDate[0],
							StartDate[1],
							StartDate[2]
						).getTime(),
					},
				}));
			}
		}

		return () => {};
	}, [GetStartDate.isSuccess, GetStartDate.isFetching]);

	return (
		<>
			{showsData && showsData?.length !== 0 ? (
				<Chart
					chartType="Gantt"
					width="100%"
					data={[columns, ...showsData]}
					options={options}
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

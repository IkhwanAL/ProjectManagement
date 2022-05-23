import React from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { ProjectActApi } from "../redux/projectActivity/projectActivityApi";
import { useGetStartDateQuery } from "../redux/project/projectApi";
import { ReformatDataForGoogleCharts } from "../Util/ReformatDataToRowsOfGoogleChart";

interface GanttOptions {
	height: number;
	gantt: {
		defaultStartDate: number;
	};
}

export default function GanttChart() {
	const { idProject } = useParams();

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

	const rows = [
		[
			"toTrain",
			"Walk to train stop",
			"walk",
			null,
			null,
			daysToMilliseconds(5),
			100,
			null,
		],
		[
			"music",
			"Listen to music",
			"music",
			null,
			null,
			daysToMilliseconds(70),
			100,
			null,
		],
		[
			"wait",
			"Wait for train",
			"wait",
			null,
			null,
			daysToMilliseconds(10),
			100,
			"toTrain",
		],
		[
			"train",
			"Train ride",
			"train",
			null,
			null,
			daysToMilliseconds(45),
			75,
			"wait",
		],
		[
			"toWork",
			"Walk to work",
			"walk",
			null,
			null,
			daysToMilliseconds(10),
			0,
			"train",
		],
		[
			"work",
			"Sit down at desk",
			null,
			null,
			null,
			daysToMilliseconds(2),
			0,
			"toWork",
		],
	];

	const datas = [columns, ...rows];

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
				<></>
			)}
		</>
	);
}

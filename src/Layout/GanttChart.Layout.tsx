import React from "react";
import { Chart } from "react-google-charts";

export default function GanttChart() {
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

	const rows = [
		[
			"Research",
			"Find sources",
			new Date(2015, 0, 1),
			new Date(2015, 0, 5),
			null,
			100,
			null,
		],
		[
			"Write",
			"Write paper",
			null,
			new Date(2015, 0, 9),
			daysToMilliseconds(3),
			25,
			"Research,Outline",
		],
		[
			"Cite",
			"Create bibliography",
			null,
			new Date(2015, 0, 7),
			daysToMilliseconds(1),
			20,
			"Research",
		],
		[
			"Complete",
			"Hand in paper",
			null,
			new Date(2015, 0, 10),
			daysToMilliseconds(1),
			0,
			"Cite,Write",
		],
		[
			"Outline",
			"Outline paper",
			null,
			new Date(2015, 0, 6),
			daysToMilliseconds(1),
			100,
			"Research",
		],
	];

	const data = [columns, ...rows];

	return (
		<>
			<Chart chartType="Gantt" width="100%" data={data} />
		</>
	);
}

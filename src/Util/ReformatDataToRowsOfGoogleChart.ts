export const ReformatDataForGoogleCharts = (data: any) => {
	const FormatArray: Array<Array<string | number>> = [];

	function daysToMilliseconds(days: number): number {
		return days * 24 * 60 * 60 * 1000;
	}
	const Activity = data.data;
	//  (Activity);
	for (const iterator of Activity) {
		const TaskId = iterator["projectActivityId"] + "";
		const TaskName = iterator["name"];
		const Duration = daysToMilliseconds(iterator["timeToComplete"]);
		const PercentComplete = iterator["progress"];
		const Dependecies = iterator["parent"];

		const payload = [
			TaskId,
			TaskName,
			null,
			null,
			Duration,
			PercentComplete,
			Dependecies,
		];

		FormatArray.push(payload);
	}

	return FormatArray;
};

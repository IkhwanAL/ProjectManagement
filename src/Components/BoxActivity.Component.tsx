import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";

interface BoxActivityProps {
	id?: number | string;
	activity: string;
	createdAt: Date;
	user: {
		username: string;
	};
}

export default function BoxActivity({
	activity,
	createdAt,
	user: { username },
}: BoxActivityProps) {
	return (
		<Box
			border={1}
			width={350}
			borderRadius={4}
			sx={{
				boxShadow: 1,
			}}
		>
			<Stack direction={"row"} justifyContent="space-between">
				<Typography mt={1} mb={1} ml={1}>
					{username}
				</Typography>
				<Typography mt={1} mb={1} mr={1}>
					{moment(createdAt).format("LL")}
				</Typography>
			</Stack>
			<Typography mt={3} mb={1} ml={1}>
				{activity}
			</Typography>
		</Box>
	);
}

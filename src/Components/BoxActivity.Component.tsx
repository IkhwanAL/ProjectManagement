import { Box, Stack, Typography } from "@mui/material";

export default function BoxActivity() {
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
					Tim1
				</Typography>
				<Typography mt={1} mb={1} mr={1}>
					25-02-2022 10:00:00
				</Typography>
			</Stack>
			<Typography mt={3} mb={1} ml={1}>
				Description Activity
			</Typography>
		</Box>
	);
}

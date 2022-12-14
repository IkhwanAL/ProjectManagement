import React from "react";
import {
	Box,
	Drawer,
	IconButton,
	LinearProgress,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import ListActivity from "./ListActivity.Component";
import CloseIcon from "@mui/icons-material/Close";
import { useGetActivityPerProjectQuery } from "../redux/Activity/ActivityApi";

interface DrawerProps {
	open: boolean;
	onClose: (arg?: any) => void;
	idProject: number | string;
}

export default function DrawerActivity({
	onClose,
	open,
	idProject,
}: DrawerProps) {
	const theme = useTheme();

	const { data, refetch, isFetching } = useGetActivityPerProjectQuery(
		idProject,
		{
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
			pollingInterval: 1000 * 60 * 10,
		}
	);

	React.useEffect(() => {
		refetch();

		return () => {};
	}, [refetch]);
	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<Box
				sx={{
					width: 350,
				}}
				role="presentation"
			>
				<IconButton
					sx={{
						borderRadius: 4,
						":hover": {
							backgroundColor: theme.palette.secondary.main,
						},
						margin: 1,
					}}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
				<Typography
					textAlign={"center"}
					color={"text.secondary"}
					paddingY={2}
					fontWeight="bold"
					component="h4"
					mt={-3}
				>
					List Activity
				</Typography>
				{/* <Button variant="contained" color="secondary">
					ASD
				</Button> */}
				{isFetching ? (
					<Box
						sx={{
							width: "100%",
						}}
					>
						<LinearProgress />
					</Box>
				) : (
					<></>
				)}
				{data?.data && data.data.length !== 0 ? (
					<ListActivity Activity={data.data} />
				) : (
					<>
						<Box>
							<Stack justifyContent="center">
								<Typography>Tidak Ada Aktifitas</Typography>
							</Stack>
						</Box>
					</>
				)}
			</Box>
		</Drawer>
	);
}

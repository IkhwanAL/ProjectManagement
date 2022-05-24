import {
	Box,
	Button,
	Drawer,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import ListActivity from "./ListActivity.Component";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
	open: boolean;
	onClose: (arg?: any) => void;
	idProject: number | string;
}

export default function DrawerActivity({ onClose, open }: DrawerProps) {
	const theme = useTheme();
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

				<ListActivity />
			</Box>
		</Drawer>
	);
}

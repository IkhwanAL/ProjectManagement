import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { OneProject } from "./OneProject.Layout";
import GanttChart from "./GanttChart.Layout";
import { IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DrawerActivity from "../Components/Drawer.Component";
import { useParams } from "react-router-dom";

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

export default function LayoutDetailProyek() {
	const { idProject } = useParams();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const [openDrawer, setOpenDrawer] = React.useState(false);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		event.stopPropagation();
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setOpenDrawer(open);
		};

	return (
		<Box sx={{ bgcolor: "background.paper", width: "100%" }}>
			<AppBar position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="List Kegiatan" {...a11yProps(0)} />
					<Tab label="Gantt Chart" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<Stack alignSelf={"self-end"}>
				{/* <Button
					variant="contained"
					sx={{
						width: 40,
						marginLeft: "auto",
						marginTop: 3,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
					}}
				> */}
				<IconButton
					sx={{
						width: 40,
						marginLeft: "auto",
						marginTop: 3,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						backgroundColor: theme.palette.primary.main,
						color: "#FFF",
						":hover": {
							backgroundColor: theme.palette.primary.light,
						},
						zIndex: 10,
					}}
					onClick={toggleDrawer(true)}
				>
					<ArrowBackIcon />
				</IconButton>
				{/* </Button> */}
			</Stack>
			<Box
				sx={{
					marginTop: -8,
				}}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<OneProject />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<GanttChart />
				</TabPanel>
			</Box>

			<DrawerActivity
				open={openDrawer}
				onClose={toggleDrawer(false)}
				idProject={idProject as string}
			/>
			{/* </Tabs> */}
			{/* </SwipeableViews> */}
		</Box>
	);
}

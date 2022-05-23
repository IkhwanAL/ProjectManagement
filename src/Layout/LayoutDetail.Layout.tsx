import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { OneProject } from "./OneProject.Layout";
import { TabContext } from "@mui/lab";
import GanttChart from "./GanttChart.Layout";

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
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		event.stopPropagation();
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
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
			{/* <SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			> */}
			{/* <Tabs value={value} textColor="inherit"> */}
			<Box>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<OneProject />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<GanttChart />
				</TabPanel>
			</Box>
			{/* </Tabs> */}
			{/* </SwipeableViews> */}
		</Box>
	);
}

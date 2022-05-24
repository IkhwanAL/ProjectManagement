import { InboxIcon, MailIcon } from "@heroicons/react/outline";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import BoxActivity from "./BoxActivity.Component";

interface ListActivtyProps {}

export default function ListActivity() {
	return (
		<List>
			<ListItem>
				<BoxActivity />
			</ListItem>
			<ListItem>
				<BoxActivity />
			</ListItem>
			<ListItem>
				<BoxActivity />
			</ListItem>
			<ListItem>
				<BoxActivity />
			</ListItem>
			<ListItem>
				<BoxActivity />
			</ListItem>
			<ListItem>
				<BoxActivity />
			</ListItem>
			<ListItem>
				<BoxActivity />
			</ListItem>
		</List>
	);
}

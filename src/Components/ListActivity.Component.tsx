import { InboxIcon, MailIcon } from "@heroicons/react/outline";
import { List, ListItem } from "@mui/material";
import { activity } from "../interface/database.interface";
import BoxActivity from "./BoxActivity.Component";

interface ListActivtyProps {
	Activity: (activity & {
		user: {
			username: string;
		};
	})[];
}

export default function ListActivity({ Activity }: ListActivtyProps) {
	return (
		<List>
			{Activity.map((x) => (
				<ListItem key={x.id + ""}>
					<BoxActivity
						id={x.id + ""}
						activity={x.activity}
						createdAt={x.createdAt}
						user={{ username: x.user.username }}
					/>
				</ListItem>
			))}
		</List>
	);
}

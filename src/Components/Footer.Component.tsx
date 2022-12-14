import { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";

const Footer = (): ReactElement => {
	return (
		<footer className="bg-secondaryPurple w-full bottom-0 fixed">
			<Stack direction={"row"} justifyContent="center">
				<Typography fontStyle="normal" color="white" paddingTop={2}>
					Made With Material UI And Tailwind CSS
				</Typography>
			</Stack>
		</footer>
	);
};

export default Footer;

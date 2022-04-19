import { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";

const Footer = (): ReactElement => {
	return (
		<div className="bg-secondaryPurple fixed m-auto w-full h-10 bottom-0">
			<Stack direction={"row"} justifyContent="center">
				<Typography fontStyle={"normal"} className="text-white p-2">
					Made With Material UI And Tailwind CSS
				</Typography>
			</Stack>
		</div>
	);
};

export default Footer;

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 5,
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export interface ErrorProps {
	isOpen: boolean;
	closeModal: (...arg: any) => void;
	head?: string;
	msg?: string;
}

export default function ModalInfo({
	isOpen,
	closeModal,
	head,
	msg,
}: ErrorProps) {
	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={closeModal}>
				<Box sx={{ ...style, width: 400 }}>
					<Stack
						direction={"row"}
						justifyContent="center"
						alignItems={"center"}
					>
						<Typography component={"h2"} textAlign="center">
							{head}
						</Typography>
					</Stack>
					<Typography
						component={"h4"}
						padding={2}
						textAlign="center"
						sx={{
							fontSize: 16,
						}}
					>
						{msg}
					</Typography>
					<Stack direction={"row"} justifyContent="center" p={1}>
						<Button color="primary" onClick={closeModal}>
							Tutup
						</Button>
					</Stack>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

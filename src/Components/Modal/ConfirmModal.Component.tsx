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

export interface ConfirmProps {
	isOpen: boolean;
	confirmAction?: (...arg: any) => void;
	cancelAction?: (...arg: any) => void;
	head?: string;
	msg?: string;
}

export default function ConfirmModal({
	isOpen,
	confirmAction,
	cancelAction,
	head,
	msg,
}: ConfirmProps) {
	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={cancelAction}>
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
						variant="subtitle1"
						padding={2}
						textAlign="center"
						sx={{
							fontSize: 16,
						}}
					>
						{msg}
					</Typography>
					<Stack direction={"row"} justifyContent="space-between">
						<Button
							color="primary"
							onClick={cancelAction}
							variant="contained"
						>
							Tidak
						</Button>
						<Button
							color="error"
							onClick={confirmAction}
							variant="contained"
						>
							Ok
						</Button>
					</Stack>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

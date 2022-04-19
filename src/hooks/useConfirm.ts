import React from "react";
import { Msg } from "../@types/error.types";

export function useConfirm(use: boolean) {
	const [confirm, setConfirm] = React.useState<boolean>(use);

	const onHandle = () => {
		setConfirm((prev) => !prev);
	};

	return { confirm, setConfirm, onHandle };
}

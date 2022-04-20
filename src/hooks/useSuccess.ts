import React from "react";
import { Msg } from "../types/error.types";

export function useSuccess(successMsg: Msg) {
	const [successState, setSuccessState] = React.useState<Msg>(successMsg);

	React.useEffect(() => {
		let timeoutAlert: any = null;
		if (successState != null && successState.error === false) {
			timeoutAlert = setTimeout(() => {
				setSuccessState({ error: true, head: null, msg: null });
			}, 3000);
		}
		return () => {
			clearTimeout(timeoutAlert);
		};
	}, [setSuccessState]);

	return { successState, setSuccessState };
}

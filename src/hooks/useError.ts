import React from "react";
import { Msg } from "../types/error.types";

export function useError(errorMsg: Msg & { action?: () => void | null }) {
	const [errorState, setErrorState] = React.useState<
		Msg & { action?: () => void | null }
	>(errorMsg);

	React.useEffect(() => {
		const callAnAction = () => {
			if (errorState.action) {
				errorState.action();
			}
		};
		let timeoutAlert: any = null;
		if (errorState != null && errorState.error === true) {
			timeoutAlert = setTimeout(() => {
				setErrorState({ error: false });
			}, 4000);
		}
		return () => {
			callAnAction();
			clearTimeout(timeoutAlert);
		};
	}, [errorState]);

	return { errorState, setErrorState };
}

import React from "react";
import { Msg } from "../@types/error.types";

export function useError(errorMsg: Msg) {
	const [errorState, setErrorState] = React.useState<Msg>(errorMsg);

	React.useEffect(() => {
		let timeoutAlert: any = null;
		if (errorState != null && errorState.error === true) {
			timeoutAlert = setTimeout(() => {
				setErrorState({ error: false, head: null, msg: null });
			}, 3000);
		}
		return () => {
			clearTimeout(timeoutAlert);
		};
	}, [errorState]);

	return { errorState, setErrorState };
}

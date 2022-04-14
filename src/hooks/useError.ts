import React from "react";
import { ErrorMsg } from "../@types/error.types";

export function useError(errorMsg: ErrorMsg) {
	const [errorState, setErrorState] = React.useState<ErrorMsg>(errorMsg);

	React.useEffect(() => {
		let timeoutAlert: any = null;
		if (errorState != null && errorState.error === true) {
			timeoutAlert = setTimeout(() => {
				setErrorState({ error: false });
			}, 3000);
		}
		return () => {
			clearTimeout(timeoutAlert);
		};
	}, [errorState]);

	return { errorState, setErrorState };
}

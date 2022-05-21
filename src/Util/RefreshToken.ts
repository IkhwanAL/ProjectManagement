import React from "react";
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	QueryDefinition,
} from "@reduxjs/toolkit/dist/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { ISuccess } from "../interface/return.interface";
import { Msg } from "../types/error.types";

interface IRefetch<T = {}> {
	refetch: () => void;
	triggerRefresh: (
		arg: null,
		preferCacheValue?: boolean | undefined
	) => QueryActionCreatorResult<
		QueryDefinition<
			null,
			BaseQueryFn<
				string | FetchArgs,
				unknown,
				FetchBaseQueryError,
				{},
				FetchBaseQueryMeta
			>,
			"Users",
			ISuccess<T>,
			"Auth"
		>
	>;
	setErrorState: (
		value: React.SetStateAction<
			Msg & {
				action?: (() => void | null) | undefined;
			}
		>
	) => void;
	errorAction?: (...arg: any) => void;
}

export const RefreshToken = ({
	refetch,
	triggerRefresh,
	setErrorState,
	errorAction,
}: IRefetch) => {
	triggerRefresh(null, true)
		.unwrap()
		.then(() => {
			refetch();
		})
		.catch(() => {
			setErrorState({
				error: true,
				head: "Gagal Memperbarui Data",
				msg: "Terjadi Kesalahan Pada Server",
				action: errorAction,
			});
		});
};

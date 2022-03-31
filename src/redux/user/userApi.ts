import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { URL } from "..";
// import { } from "./userSlice";

export const REDUCER_API_PATH = "UserApi";
export const UserApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: URL,
		// prepareHeaders: (headers, api) => {
		// 	const user = api.getState() as UserState;

		// 	if (user.value.token) {
		// 		headers.set("Authorization", `Bearer ${user.value.token}`);
		// 	}

		// 	return headers;
		// },
	}),
	reducerPath: REDUCER_API_PATH,
	endpoints: (builder) => ({
		Login: builder.mutation({
			query: (data) => {
				return {
					url: "/login",
					method: "POST",
					body: data,
				};
			},
		}),
		Register: builder.mutation({
			query: (data) => {
				return {
					url: "/register",
					method: "POST",
					body: data,
				};
			},
		}),
	}),
});

// export const UserApiSplit = emptySplitApi.injectEndpoints({});

export const { useLoginMutation } = UserApi;

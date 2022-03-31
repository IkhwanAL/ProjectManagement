import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "..";
import { DataUser } from "../../Props/User.property";
import { UserState } from "./userTeamSlice";

export const REDUCER_API_PATH = "/userTeam";

export const UserTeamApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: URL,
		prepareHeaders: (headers, api) => {
			const token = api.getState() as UserState;

			if (token.value.token) {
				headers.set("Authorization", `Bearer ${token.value.token}`);
			}

			return headers;
		},
	}),
	reducerPath: REDUCER_API_PATH,
	endpoints: (builder) => ({
		Accept: builder.mutation({
			query: (data) => {
				return {
					url: `/accept`,
					method: "POST",
					body: data,
				};
			},
		}),
	}),
});

export const { useAcceptMutation } = UserTeamApi;

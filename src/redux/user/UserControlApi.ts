import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { URL } from "..";
import { UserState } from "./userSlice";

export const REDUCER_API_PATH = "UserControlApi";
export const UserApi = createApi({
	reducerPath: REDUCER_API_PATH,
	tagTypes: ["User"],
	baseQuery: fetchBaseQuery({
		baseUrl: URL,
		prepareHeaders: (headers, api) => {
			const user = api.getState() as UserState;

			if (user.value.token) {
				headers.set("Authorization", `Bearer ${user.value.token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		Update: builder.mutation({
			query: (data) => {
				return {
					url: `/users`,
					method: "PATCH",
					body: data,
				};
			},
			invalidatesTags: ["User"],
		}),
		Delete: builder.mutation({
			query: () => {
				return {
					url: "/users",
					method: "DELETE",
				};
			},
		}),
		ChangePassword: builder.mutation({
			query: (data) => {
				return {
					url: "/users/changeps",
					method: "PATCH",
					body: data,
				};
			},
		}),
		RefreshLink: builder.mutation({
			query: (data) => {
				return {
					url: "/refresh",
					method: "POST",
					body: data,
				};
			},
		}),
		GetUser: builder.query({
			query: () => `/users`,
			providesTags: ["User"],
		}),
	}),
});

export const {
	useUpdateMutation,
	useDeleteMutation,
	useRefreshLinkMutation,
	useChangePasswordMutation,
} = UserApi;

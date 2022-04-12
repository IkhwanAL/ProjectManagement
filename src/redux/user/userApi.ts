import { DataUser } from "../../Props/User.property";
import user from "../../_mock/_user.json";
import "dotenv/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess, LoginSuksesData } from "../../@types/return.types";
import { QueryArgLogin } from "../../@types/arg.types";

export function getUserApi(username: string) {
	return new Promise<{ data: DataUser }>((resolve) => {
		const filterUser = user.filter((x, y) => x.username === username);
		setTimeout(
			() =>
				resolve({
					data: filterUser[0],
				}),
			1000 * 1
		);
	});
}

const REDUCER_API_PATH_NAME = "Users";
export const UserApi = createApi({
	reducerPath: REDUCER_API_PATH_NAME,
	tagTypes: ["Users"],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.WEB_API_HOST,
	}),
	endpoints: (builder) => ({
		Login: builder.mutation<ISuccess<LoginSuksesData>, QueryArgLogin>({
			query: (data) => {
				return {
					url: `login`,
					body: data,
					method: "POST",
				};
			},
		}),
		Register: builder.mutation({
			query: (data) => {
				return {
					url: "register",
					body: data,
					method: "POST",
				};
			},
		}),
		RefreshToken: builder.mutation({
			query: (data) => {
				return {
					url: "refreshToken",
					body: data,
					method: "POST",
				};
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRefreshTokenMutation,
} = UserApi;

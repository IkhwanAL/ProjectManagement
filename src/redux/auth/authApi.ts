import "dotenv/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess, LoginSuksesData } from "../../interface/return.interface";
import { QueryArgLogin } from "../../@types/arg.types";

const REDUCER_API_PATH_NAME = "Auth";
export const AuthApi = createApi({
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
} = AuthApi;

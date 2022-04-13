import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess, LoginSuksesData } from "../../interface/return.interface";
import { QueryArgLogin } from "../../@types/arg.types";
import { Environtment } from "..";
import { SetLogin } from "../user/userSlice";
import { setSessionStorage } from "../../Util/SessionStorage";

const REDUCER_API_PATH_NAME = "Auth";
export const AuthApi = createApi({
	reducerPath: REDUCER_API_PATH_NAME,
	tagTypes: ["Users"],
	baseQuery: fetchBaseQuery({
		baseUrl: Environtment.Url_Api,
	}),
	endpoints: (builder) => ({
		Login: builder.mutation<ISuccess<LoginSuksesData>, QueryArgLogin>({
			query: (data) => {
				return {
					url: `/login`,
					body: data,
					method: "POST",
				};
			},
			async onQueryStarted(_id, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					setSessionStorage("token", data.data?.token);
				} catch (error) {
					dispatch(SetLogin(false));
				}
			},
		}),
		Register: builder.mutation({
			query: (data) => {
				return {
					url: "/register",
					body: data,
					method: "POST",
				};
			},
		}),
		RefreshToken: builder.mutation({
			query: (data) => {
				return {
					url: "/refreshToken",
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

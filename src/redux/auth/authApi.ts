import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess, LoginSuksesData } from "../../interface/return.interface";
import { QueryArgLogin } from "../../@types/arg.types";
import { Environtment } from "..";
import { SetLogin, SetTokenParams } from "../user/userSlice";
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
		RefreshLink: builder.mutation({
			query: (data) => {
				return {
					url: "/refresh",
					body: data,
					method: "POST",
				};
			},
		}),
		Verify: builder.mutation<ISuccess<LoginSuksesData>, { q: string }>({
			query: (data) => {
				return {
					url: `/verify`,
					method: "POST",
					body: data,
				};
			},
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled;

					api.dispatch(SetTokenParams(data.data?.token));
					setSessionStorage("token", data.data?.token);
					api.dispatch(SetLogin(true));
				} catch (error) {}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRefreshTokenMutation,
	useVerifyMutation,
	useRefreshLinkMutation,
} = AuthApi;

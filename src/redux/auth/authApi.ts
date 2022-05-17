import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess, LoginSuksesData } from "../../interface/return.interface";
import { QueryArgLogin } from "../../types/arg.types";
import { Environtment } from "..";
import { SetIdUser, SetLogin, SetTokenParams } from "../user/userSlice";
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
					keepalive: true,
					credentials: "include",
				};
			},
			transformResponse: (response, meta, arg) => {
				return response as ISuccess<LoginSuksesData>;
			},
			async onQueryStarted(_id, arg) {
				try {
					const { data } = await arg.queryFulfilled;
					setSessionStorage("token", data.data?.token);
					arg.dispatch(SetTokenParams(data?.data?.token));
					arg.dispatch(SetIdUser(data?.data?.id));
					arg.dispatch(SetLogin(true));
				} catch (error) {
					arg.dispatch(SetLogin(false));
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
		RefreshToken: builder.query<ISuccess<LoginSuksesData>, null>({
			query: () => {
				return {
					url: "/refreshToken",
					method: "GET",
					credentials: "include",
				};
			},
			async onQueryStarted(_id, arg) {
				try {
					const { data } = await arg.queryFulfilled;

					setSessionStorage("token", data.data?.token);
					arg.dispatch(SetTokenParams(data?.data?.token));
					arg.dispatch(SetLogin(true));
				} catch (error) {
					arg.dispatch(SetLogin(false));
				}
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
	useLazyRefreshTokenQuery,
	useVerifyMutation,
	useRefreshLinkMutation,
} = AuthApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess } from "../../interface/return.interface";
import { IUser } from "../../interface/user.interface";
import { user } from "../../@types/database.types";
import { Environtment } from "..";

const REDUCER_API_PATH_NAME = "Users";
export const UserApi = createApi({
	reducerPath: REDUCER_API_PATH_NAME,
	tagTypes: ["Users"],
	baseQuery: fetchBaseQuery({
		baseUrl: Environtment.Url_Api,
		prepareHeaders: (headers, api) => {
			const User = api.getState() as IUser;

			const token = User.values.token;

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		GetUserById: builder.query<ISuccess<user>, null>({
			query: () => {
				return {
					url: "/user",
					method: "GET",
				};
			},
		}),
	}),
});

export const { useGetUserByIdQuery } = UserApi;

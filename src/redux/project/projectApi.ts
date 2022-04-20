import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess } from "../../interface/return.interface";
import { Environtment } from "..";
import { RootState } from "../../app/store";
import { project } from "../../@types/database.types";
import { QueryArgProject } from "../../@types/arg.types";
import {
	GetAllProjectReturn,
	GetProjectSmall,
} from "../../@types/return.types";

const REDUCER_API_PATH_NAME = "Projects";
export const ProjectApi = createApi({
	reducerPath: REDUCER_API_PATH_NAME,
	tagTypes: ["Projects"],
	baseQuery: fetchBaseQuery({
		baseUrl: Environtment.Url_Api,
		prepareHeaders: (headers, api) => {
			const User = api.getState() as RootState;

			const token = User.User.values.token;

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		CreateProject: builder.mutation<
			ISuccess<project>,
			Partial<QueryArgProject & { projectId?: number }>
		>({
			query: (data) => {
				return {
					url: "/project",
					body: data,
					credentials: "include",
					method: "POST",
				};
			},
		}),
		PatchProject: builder.mutation<
			ISuccess<project>,
			Partial<QueryArgProject & { projectId?: number }>
		>({
			query: ({ projectId, ...rest }) => {
				return {
					url: `/project/${projectId}`,
					body: rest,
					credentials: "include",
					method: "PATCH",
				};
			},
		}),
		GetAllProject: builder.query<ISuccess<GetAllProjectReturn>, null>({
			query: () => {
				return {
					url: "/project",
					credentials: "include",
					method: "GET",
				};
			},
		}),
		GetOneProjectNoCalc: builder.query<ISuccess<GetProjectSmall>, number>({
			query: (data) => {
				return {
					url: `/project/get/${data}`,
					credentials: "include",
					method: "GET",
				};
			},
		}),
	}),
});

export const {
	useCreateProjectMutation,
	usePatchProjectMutation,
	useGetAllProjectQuery,
	useLazyGetOneProjectNoCalcQuery,
} = ProjectApi;

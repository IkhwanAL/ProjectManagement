import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess } from "../../interface/return.interface";
import { Environtment } from "..";
import { RootState } from "../../app/store";
import { ProjecType } from "../../types/project.types";
import { QueryArgProject } from "../../types/arg.types";
import { GetAllProjectReturn, GetProjectSmall } from "../../types/return.types";
import {
	GetOneProjectActivity,
	MoveStateReturn,
} from "../../interface/proyek.interface";
import { projectactivity_position } from "../../types/database.types";

const REDUCER_API_PATH_NAME = "ProjectsActivities";
export const ProjectActApi = createApi({
	reducerPath: REDUCER_API_PATH_NAME,
	tagTypes: ["Projects", "ProjectActivity", "ActivityUser"],
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
		GetOneProjectAct: builder.query<
			ISuccess<ProjecType>,
			{ idProject: number }
		>({
			query: ({ idProject }) => {
				return {
					url: `/project/${idProject}`,
					method: "GET",
					credentials: "include",
				};
			},
			providesTags: ["Projects"],
		}),
		MoveActivityPosition: builder.mutation<
			ISuccess<MoveStateReturn>,
			MoveStateReturn
		>({
			query: ({ projectActivityId, position }) => {
				return {
					url: `/projectactivity/move/${projectActivityId}`,
					body: { position },
					credentials: "include",
					method: "PATCH",
				};
			},
			invalidatesTags: ["Projects"],
		}),
		GetOneProjectActivity: builder.query<
			ISuccess<GetOneProjectActivity>,
			number
		>({
			query: (idProjectActivity) => {
				return {
					url: `/ProjectActivity/GET/${idProjectActivity}`,
					credentials: "include",
					method: "GET",
				};
			},
			providesTags: ["ProjectActivity"],
		}),
		GetSimple: builder.query({
			query: (idProjectActivity) => {
				return {
					url: `/ProjectActivity/GET/${idProjectActivity}`,
					credentials: "include",
					method: "GET",
				};
			},
			providesTags: ["ProjectActivity"],
		}),
		CreateOne: builder.mutation({
			query: ({ idProject, data }) => ({
				url: "/projectactivity/project/" + idProject,
				body: data,
				method: "POST",
				credentials: "include",
			}),
			invalidatesTags: ["Projects", "ActivityUser"],
		}),
		PatchOne: builder.mutation({
			query: ({ idProject, data }) => ({
				url: "/projectactivity/project/" + idProject,
				body: data,
				method: "PATCH",
				credentials: "include",
			}),
			invalidatesTags: ["Projects", "ActivityUser"],
		}),
		GetAllActivity: builder.query({
			query: (idProject) => ({
				url: "/projectactivity/project/" + idProject,
				method: "GET",
				credentials: "include",
			}),
			providesTags: ["Projects"],
		}),
		DeleteProjectActivity: builder.mutation({
			query: (idProjectActivity) => ({
				url: "/projectActivity/" + idProjectActivity,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["Projects", "ActivityUser"],
		}),
	}),
});

export const {
	useGetOneProjectActQuery,
	useMoveActivityPositionMutation,
	useLazyGetOneProjectActivityQuery,
	useLazyGetSimpleQuery,
	useCreateOneMutation,
	usePatchOneMutation,
	useGetAllActivityQuery,
	useDeleteProjectActivityMutation,
} = ProjectActApi;

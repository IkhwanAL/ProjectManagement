import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess } from "../../interface/return.interface";
import { Environtment } from "..";
import { RootState } from "../../app/store";
import { project } from "../../types/database.types";
import { QueryArgProject } from "../../types/arg.types";
import {
	GetAllProjectReturn,
	GetProjectSmall,
	LeaderInterface,
	UserTeamSelect,
} from "../../types/return.types";
import { activity } from "../../interface/database.interface";

const REDUCER_API_PATH_NAME = "Projects";
export const ProjectApi = createApi({
	reducerPath: REDUCER_API_PATH_NAME,
	tagTypes: ["Projects", "Teams", "DetailProject", "Leader", "ActivityUser"],
	// keepUnusedDataFor: 0,
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
			invalidatesTags: ["Projects", "ActivityUser"],
		}),
		PatchProject: builder.mutation<
			ISuccess<project>,
			Partial<QueryArgProject & { projectId: number }>
		>({
			query: ({ projectId, ...rest }) => {
				return {
					url: `/project/${projectId}`,
					body: rest,
					credentials: "include",
					method: "PATCH",
				};
			},
			invalidatesTags: ["Projects", "ActivityUser"],
		}),
		GetAllProject: builder.query<ISuccess<GetAllProjectReturn>, null>({
			query: () => {
				return {
					url: "/project",
					credentials: "include",
					method: "GET",
				};
			},
			providesTags: ["Projects"],
		}),
		GetAllRecentProject: builder.query<ISuccess<GetAllProjectReturn>, null>(
			{
				query: () => {
					return {
						url: "/project/recent",
						credentials: "include",
						method: "GET",
					};
				},
				providesTags: ["Projects"],
			}
		),
		GetOneProjectNoCalc: builder.query<
			ISuccess<GetProjectSmall>,
			number | string
		>({
			query: (data) => {
				return {
					url: `/project/get/${data}`,
					credentials: "include",
					method: "GET",
				};
			},
			providesTags: ["Projects"],
		}),
		GetStartDate: builder.query<Date, string>({
			query: (data) => ({
				url: `/project/get/${data}`,
				credentials: "include",
				method: "GET",
			}),
			transformResponse(
				baseQueryReturnValue: ISuccess<GetProjectSmall>,
				_meta,
				_arg
			) {
				return baseQueryReturnValue.data?.startDate as Date;
			},
			providesTags: ["Projects"],
		}),
		GetUserTeam: builder.query<ISuccess<UserTeamSelect[]>, number>({
			query: (data) => ({
				url: `/project/userteam/${data}`,
				credentials: "include",
				method: "GET",
			}),
			providesTags: ["Teams"],
		}),
		GetLeader: builder.query<ISuccess<LeaderInterface>, number>({
			query: (data) => ({
				url: `/project/getCurrentLeader/${data}`,
				method: "GET",
				credentials: "include",
			}),
			providesTags: ["Leader"],
		}),
		ChangeOwner: builder.mutation({
			query: ({ idProject, idUserInvitation }) => ({
				url: `/changeowner/${idProject}/${idUserInvitation}`,
				method: "POST",
				credentials: "include",
			}),
			invalidatesTags: ["Projects", "ActivityUser"],
		}),
		DeleteUserTeam: builder.mutation({
			query: ({ Data, idProject }) => ({
				url: `/userteam/delete/${idProject}`,
				body: {
					Data: Data,
				},
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["Teams", "ActivityUser"],
		}),
		InviteUser: builder.mutation({
			query: (data) => ({
				url: `/invite`,
				body: data,
				method: "POST",
				credentials: "include",
			}),
		}),
		DeleteProject: builder.mutation({
			query: (idProyek) => ({
				url: `/project/` + idProyek,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["Projects"],
		}),
	}),
});

export const {
	useCreateProjectMutation,
	usePatchProjectMutation,
	useGetAllProjectQuery,
	useGetAllRecentProjectQuery,
	useLazyGetOneProjectNoCalcQuery,
	useGetUserTeamQuery,
	useGetLeaderQuery,
	useChangeOwnerMutation,
	useDeleteUserTeamMutation,
	useGetStartDateQuery,
	useInviteUserMutation,
	useDeleteProjectMutation,
} = ProjectApi;

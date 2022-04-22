import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISuccess } from "../../interface/return.interface";
import { Environtment } from "..";
import { RootState } from "../../app/store";
import { ProjecType } from "../../types/project.types";
import { QueryArgProject } from "../../types/arg.types";
import { GetAllProjectReturn, GetProjectSmall } from "../../types/return.types";
import { MoveStateReturn } from "../../interface/proyek.interface";
import { projectactivity_position } from "../../types/database.types";

const REDUCER_API_PATH_NAME = "ProjectsActivities";
export const ProjectActApi = createApi({
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
		}),
	}),
});

export const { useGetOneProjectActQuery, useMoveActivityPositionMutation } =
	ProjectActApi;

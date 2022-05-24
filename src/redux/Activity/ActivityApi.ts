import { activity } from "../../interface/database.interface";
import { ISuccess } from "../../interface/return.interface";
import { ProjectApi } from "../project/projectApi";

const ExtendedProjectApi = ProjectApi.injectEndpoints({
	endpoints: (build) => ({
		GetActivityPerProject: build.query<
			ISuccess<(activity & { user: { username: string } })[]>,
			number | string
		>({
			query: (idProject) => ({
				url: "/activity/" + idProject,
				method: "GET",
				credentials: "include",
			}),
			providesTags: ["ActivityUser"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetActivityPerProjectQuery } = ExtendedProjectApi;

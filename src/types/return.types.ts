import { userteam_role, user } from "./database.types";
export interface ISuccess<T> {
	sukses: boolean;
	message: string;
	status: number;
	data?: T;
}

export interface LoginSuksesData {
	token: string;
}

export interface GetProjectReturn {
	user: {
		username: string;
	};
	projectId: number;
	projectName: string;
	deadline: Date;
	startDate: Date | null;
	projectDescription: string;
	deadlineInString: string;
	projectactivity: {
		progress: number;
	}[];
	userteam: {
		user: {
			username: string;
		};
	}[];
}

export interface GetProjectSmall {
	projectId?: number;
	projectName?: string;
	projectDescription?: string;
	startDate?: Date;
}

export type GetAllProjectReturn = GetProjectReturn[];

export interface UserTeamSelect {
	userId: number;
	teamId: number;
	role: userteam_role;
	user: {
		email: string;
		username: string;
	};
}

export interface LeaderInterface {
	user: user;
	userowner: number;
}

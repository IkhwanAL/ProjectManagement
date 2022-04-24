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
	projectDescription: string;
	deadlineInString: string;
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
}

export type GetAllProjectReturn = GetProjectReturn[];
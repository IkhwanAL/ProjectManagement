export enum projectactivity_position {
	To_Do = "To_Do",
	Doing = "Doing",
	Review = "Review",
	Done = "Done",
}

export enum userteam_role {
	Proyek_Manager = "Proyek_Manager",
	Tim = "Tim",
}

export interface project {
	projectId: number;
	projectName: string;
	projectDescription: string;
	deadline: Date | null;
	deadlineInString: string | null;
	userOwner: number;
	createdAt: Date | null;
	updatedAt: Date | null;
}

export interface PReturn {
	projectId: number;
	projectName: string;
	projectDescription: string;
	deadline: Date | null;
	deadlineInString: string | null;
	user: {
		username: string;
	};
	userteam: Array<{ user: { username: string } }>;
}
export interface projectactivity {
	projectActivityId: number;
	projectId: number;
	name: string;
	critical: boolean | null;
	progress: number;
	position: projectactivity_position;
	timeToComplete: number;
	status: boolean;
	description: string;
	parent?: string | null;
	child?: string | null;
	createdAt?: Date | null;
	updatedAt?: Date | null;
}

export interface subdetailprojectactivity {
	subDetailProjectActivityId: number;
	detailProyekId: number;
	description: string;
	isComplete: boolean;
	createdAt: Date | null;
	updatedAt: Date | null;
}

export interface user {
	id: number | null | undefined;
	email: string | null | undefined;
	createdAt?: Date | null | undefined;
	firstName: string | null | undefined;
	isActive?: boolean | null | undefined;
	lastName: string | null | undefined;
	password?: string | null | undefined;
	updatedAt?: Date | null | undefined;
	username: string | null | undefined;
	phoneNumber: string | null | undefined;
}

export interface usertaskfromassignee {
	idTask: number;
	idUser: number;
	projectActivityId: number;
	createdAt: Date;
}

export interface userteam {
	teamId: number;
	userId: number;
	projectId: number;
	role: userteam_role;
	addedAt: Date | null;
}
export interface activity {
	id: number;
	activity: string;
	userId: number;
	projectId: number | null;
	projectActivityId: number | null;
	subDetailProjectActivityId: number | null;
	createdAt: Date;
}

export interface Link {
	linkId: number;
	userId: number;
	createdAt: Date;
	description: string;
	expiredAt: Date;
}

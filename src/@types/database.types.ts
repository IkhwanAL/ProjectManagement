export enum Position {
	To_Do = "To_Do",
	Doing = "Doing",
	Review = "Review",
	Done = "Done",
}

export enum Role {
	Proyek_Manager = "Proyek_Manager",
	Tim = "Tim",
}

export type Project = {
	projectId: number;
	projectName: string;
	projectDescription: string;
	deadline: Date | null;
	deadlineInString: string | null;
	userOwner: number;
	createdAt: Date | null;
	updatedAt: Date | null;
};

export type ProjectActivity = {
	projectActivityId: number;
	projectId: number;
	name: string;
	critical: boolean | null;
	progress: number;
	position: Position;
	timeToComplete: number;
	status: boolean;
	description: string;
	parent: string | null;
	child: string | null;
	createdAt: Date | null;
	updatedAt: Date | null;
};

export type SubDetailProjectActivity = {
	subDetailProjectActivityId: number;
	detailProyekId: number;
	description: string;
	isComplete: boolean;
	createdAt: Date | null;
	updatedAt: Date | null;
};

export type User = {
	id: number;
	email: string | null;
	createdAt: Date | null;
	firstName: string | null;
	isActive: boolean | null;
	lastName: string | null;
	password: string | null;
	updatedAt: Date | null;
	username: string | null;
	phoneNumber: string | null;
};

export type UserTaskFromAssignee = {
	idTask: number;
	idUser: number;
	projectActivityId: number;
	createdAt: Date;
};

export type UserTeam = {
	teamId: number;
	userId: number;
	projectId: number;
	role: Role;
	addedAt: Date | null;
};
export type Activity = {
	id: number;
	activity: string;
	userId: number;
	projectId: number | null;
	projectActivityId: number | null;
	subDetailProjectActivityId: number | null;
	createdAt: Date;
};

export type Link = {
	linkId: number;
	userId: number;
	createdAt: Date;
	description: string;
	expiredAt: Date;
};

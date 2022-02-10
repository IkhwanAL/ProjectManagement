export enum PositionCard {
	"To Do",
	"Doing",
	"Review",
	"Done",
}

export interface ProjectData {
	id: number;
	owner: string;
	description: string;
	dueDate?: string;
	projectName: string;
	recent?: boolean;
}

export interface EntityLink {
	linkId: number;
	userId: number;
	link: string;
	createdAt: Date;
	expiredAt: Date;
	updatedAt: Date;
}

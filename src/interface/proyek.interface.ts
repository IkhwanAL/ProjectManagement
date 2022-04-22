import { projectactivity_position } from "../types/database.types";

export interface ProyekForm {
	projectName: string;
	projectDescription: string;
}

export interface ProyekValueState extends Partial<ProyekForm> {}

export interface IProyek {
	values: {
		id?: number;
	};
}

export interface IProyekActivities {
	values: {
		id?: number;
	};
}

export interface MoveStateReturn {
	projectActivityId: number;
	position: projectactivity_position;
}

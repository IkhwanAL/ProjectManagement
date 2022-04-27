import {
	projectactivity,
	projectactivity_position,
	subdetailprojectactivity,
	usertaskfromassignee,
} from "./database.interface";

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

export interface GetOneProjectActivity extends projectactivity {
	ParentActivityName: Array<any> | null;
	subdetailprojectactivity: subdetailprojectactivity[] | null;
	usertaskfromassignee:
		| (usertaskfromassignee & { user: { username: string } })
		| null;
}

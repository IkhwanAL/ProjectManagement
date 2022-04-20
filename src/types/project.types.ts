import {
	project,
	projectactivity,
	subdetailprojectactivity,
	userteam,
} from "./database.types";

export type ProjecType = project & {
	userteam: (userteam & {
		user: {
			id: number;
			firstName: string;
			lastName: string;
			email: string;
			username: string;
		};
	})[];
	projectactivity: (projectactivity & {
		f?: number;
		critical?: boolean;
		subdetailprojectactivity: subdetailprojectactivity[];
	})[];
};

export type ProjectActivityType = projectactivity & {
	subdetailprojectactivity: subdetailprojectactivity[];
};

export type ActProject = projectactivity & { handleShow?: (arg?: any) => void };

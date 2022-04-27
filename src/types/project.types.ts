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

export type ProjectActicityForState = projectactivity & {
	f?: number;
	critical?: boolean;
	subdetailprojectactivity?: subdetailprojectactivity[];
};

export type ProjectActivityType = projectactivity & {
	subdetailprojectactivity: subdetailprojectactivity[];
};

export type ActProject = ProjectActicityForState & {
	handleShow?: (...arg: any) => void;
	isOpen?: boolean;
	userteam?: Partial<userteam & { user: { username: string } }>[];
};

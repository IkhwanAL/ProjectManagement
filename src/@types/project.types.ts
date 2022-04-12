import { Project, ProjectActivity, SubDetailProjectActivity, UserTeam } from "./database.types";

export type ProjecType = Project & {
    UserTeam: (UserTeam & {
        User: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            username: string;
        };
    })[];
    ProjectActivity: (ProjectActivity & {
        f?: number;
        critical?: boolean;
        SubDetailProjectActivity: SubDetailProjectActivity[];
    })[];
};

export type ProjectActivityType = ProjectActivity & {
    SubDetailProjectActivity: SubDetailProjectActivity[];
};
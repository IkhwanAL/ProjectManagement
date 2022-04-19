export interface ProyekForm {
	projectName: string;
	projectDescription: string;
}

export interface ProyekValueState extends Partial<ProyekForm> {}

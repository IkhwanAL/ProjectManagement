export type Msg = {
	error: boolean;
	head?: string | null;
	msg?: string | null;
	action?: (...arg: any) => void;
};

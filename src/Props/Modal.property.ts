import React from "react";

export interface ModalProps {
	setModal: (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
	modal?: boolean;
}

export interface ModalPropsUI {
	setModal: (ev: any) => void;
	modal?: boolean;
}

export interface AnyModalProps {
	isOpen: boolean;
	head?: string;
	msg?: string;
	closeModal: (ev: any) => void;
	action?: (...arg: any) => void;
	idProyek?: number;
	data?: any;
	dataToCompare?: any;
}

export interface InfoModalProps {
	isOpen: boolean;
	head?: string;
	msg?: string;
	closeModal: (ev: any) => void;
	onAccept?: (ev: any) => void;
	loading?: boolean;
}

export interface ProyekKegiatanProps {
	isOpen: boolean;
	handleShow: (arg?: any) => void;
	idProjectActivity?: number;
	ActivityName: string;
}

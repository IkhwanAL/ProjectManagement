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
}

export interface InfoModalProps {
	isOpen: boolean;
	head?: string;
	msg?: string;
	closeModal: (ev: any) => void;
	onAccept?: (ev: any) => void;
	loading?: boolean;
}

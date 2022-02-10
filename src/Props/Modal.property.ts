import React from "react";

export interface ModalProps {
	setModal: (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
	modal?: boolean;
}

export interface ModalPropsUI {
	setModal: (
		ev:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	modal?: boolean;
}

import React from "react";
import { Subject } from "rxjs";

const modalSubject = new Subject<boolean>();

const initValue = false;

let stateModal = initValue;

export const modalStore = {
	subscribe: (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		return modalSubject.subscribe(setModal);
	},
	changeValue: (modal: boolean) => {
		stateModal = modal;
		return modalSubject.next(stateModal);
	},
	initValue,
};

import React from "react";
import { BehaviorSubject } from "rxjs";

export interface ValueOfPropsModal {
	UserModal: boolean;
	ChangePasswordModal: boolean;
}

export const initialValueOfProps: ValueOfPropsModal = {
	UserModal: false,
	ChangePasswordModal: false,
};

type actionModal = "UserModal" | "ChangePasswordModal";

let initBehaviourSubject = initialValueOfProps;

const BhvSubjectModal = new BehaviorSubject<ValueOfPropsModal>(
	initBehaviourSubject
);

export const StoreModal = {
	Subscribe: (
		setModal: React.Dispatch<React.SetStateAction<ValueOfPropsModal>>
	) => {
		return BhvSubjectModal.subscribe(setModal);
	},
	ModalChange: (isActive: boolean, key: actionModal) => {
		initBehaviourSubject[key] = isActive;

		return BhvSubjectModal.next(initBehaviourSubject);
	},
	initBehaviourSubject,
};

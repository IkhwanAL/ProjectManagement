/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { Backdrop } from "@mui/material";
import { Fragment, useRef, useState } from "react";
import { ModalPropsUI } from "../../Props/Modal.property";
import FormUserUI from "../Form/FormUserUI.Component";

export default function InfoUserUI({
	setModal,
	modal,
}: ModalPropsUI): JSX.Element {
	// const [_, setOpen] = useState(false);

	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={modal} as={Fragment}>
			<Backdrop open={modal as boolean} onClick={setModal}>
				<Dialog
					as="div"
					className="fixed z-10 inset-0 overflow-y-auto "
					// initialFocus={cancelButtonRef}
					onClose={setModal}
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>
						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="inline-block align-bottom w-3/4 bg-gray-100 lg:max-w-2xl rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-2/4">
								<FormUserUI setModal={setModal} />
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Backdrop>
		</Transition.Root>
	);
}

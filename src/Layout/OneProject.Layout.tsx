import { useParams } from "react-router-dom";
import { Connected, socket } from "../app/socket";
import { PencilIcon, PlusIcon } from "@heroicons/react/solid";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

const OneProject = () => {
	const { idProject } = useParams();
	const [open, setOpen] = useState(false);

	const cancelButtonRef = useRef(null);

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed z-10 inset-0 overflow-y-auto"
					initialFocus={cancelButtonRef}
					onClose={setOpen}
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
							<div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title
											as="h3"
											className="text-lg leading-6 font-medium text-gray-900 text-center"
										>
											Kegiatan To Do
										</Dialog.Title>
										<div className="mt-3">
											<label className="block text-sm  text-gray-700">
												Progress
											</label>
											<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
												<div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
											</div>
										</div>
										<div className="mt-10">
											<label
												htmlFor="email-address"
												className="block text-sm  text-gray-700"
											>
												Email address
											</label>
											<input
												type="text"
												name="email-address"
												id="email-address"
												autoComplete="email"
												className="mt-1 p-2 block w-full border-1  shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
										<div className="mt-3">
											<label
												htmlFor="waktu"
												className="block text-sm  text-gray-700"
											>
												Waktu
											</label>
											<input
												type="text"
												name="waktu"
												id="waktu"
												placeholder="Waktu untuk selesai, cth 5"
												className="mt-1 p-2 block w-full border-1 shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
										<div className="mt-3">
											<label
												htmlFor="deksripsi"
												className="block text-sm  text-gray-700"
											>
												Deskripsi
											</label>
											<textarea
												className="mt-1 p-2 block w-full border-1 shadow-sm sm:text-sm border-gray-300 rounded-md"
												placeholder="Deksripsi"
											></textarea>
										</div>
										<div className="mt-3">
											<label
												htmlFor="deksripsi"
												className="block text-sm  text-gray-700"
											>
												Kegiatan Sebelumnya
											</label>
											<select
												name=""
												id=""
												className="mt-1 p-2 block w-full border-1 shadow-sm sm:text-sm border-gray-300 rounded-md"
											>
												<option selected>
													-Pilih Kegiatan Sebelumnya-
												</option>
												<option value="">
													Kegiatan A
												</option>
												<option value="">
													Kegiatan B
												</option>
												<option value="">
													Kegiatan C
												</option>
											</select>
										</div>
										<div className="mt-3">
											<label
												htmlFor="deksripsi"
												className="block text-sm  text-gray-700"
											>
												Status
											</label>

											<div className="flex items-center">
												<input
													id="aktif"
													name="status"
													type="radio"
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
												/>
												<label
													htmlFor="aktif"
													className="ml-3 block text-sm font-medium text-gray-700"
												>
													Aktif
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="unaktif"
													name="status"
													type="radio"
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
												/>
												<label
													htmlFor="unaktif"
													className="ml-3 block text-sm font-medium text-gray-700"
												>
													Tidak Aktif
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={() => setOpen(false)}
									>
										Simpan
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			<div className="w-full h-screen max-w-7xl mx-auto">
				<div className="grid grid-cols-4">
					<div>
						<div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
							<div className="flex justify-between items-center">
								<div></div>
								<h3 className="text-center font-bold">To Do</h3>
								<button onClick={() => setOpen(true)}>
									<PlusIcon width={20} />
								</button>
							</div>

							<div className="bg-white p-3 mt-5 rounded-xl">
								<div className="flex justify-between">
									<h4 className="font-bold">Create UI/UX</h4>
									<button onClick={() => setOpen(true)}>
										Edit
									</button>
								</div>
								<p className="text-gray-600">
									Dekripsi Singkat
								</p>

								<div className="mt-3">
									<p className="text-gray-600 mb-2">
										Progress
									</p>
									<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
										<div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
							<div className="flex justify-between items-center">
								<div></div>
								<h3 className="text-center font-bold">Doing</h3>
								<button onClick={() => setOpen(true)}>
									<PlusIcon width={20} />
								</button>
							</div>
						</div>
					</div>
					<div>
						<div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
							<div className="flex justify-between items-center">
								<div></div>
								<h3 className="text-center font-bold">
									Review
								</h3>
								<button onClick={() => setOpen(true)}>
									<PlusIcon width={20} />
								</button>
							</div>
						</div>
					</div>
					<div>
						<div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
							<div className="flex justify-between items-center">
								<div></div>
								<h3 className="text-center font-bold">Done</h3>
								<button onClick={() => setOpen(true)}>
									<PlusIcon width={20} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OneProject;

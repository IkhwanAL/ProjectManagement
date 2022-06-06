/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import Logo from "../assets/Logo500X500.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ResetUser, userSelector } from "../redux/user/userSlice";
import InfoUserUI from "./Modal/InfoUserUI.Component";
import AddIcon from "@mui/icons-material/Add";
import ChangePassword from "./Modal/Password.Component";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import InfoModal from "./Modal/Info.Component";
import { useConfirm } from "../hooks/useConfirm";
import {
	useLazyDeleteUserQuery,
	useLazyLogoutQuery,
} from "../redux/user/userApi";
import PeopleIcon from "@mui/icons-material/People";
import ProyekModal from "./Modal/ProyekModal.Component";
import { proyekSelector, ResetIdProyek } from "../redux/project/projectSlice";
import { MainListTeam } from "./Modal/ListTeamModal.Component";
import { ChangeOwnerForm } from "./Form/ChangeOwnership.Component";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteProjectMutation } from "../redux/project/projectApi";

const navigation = [
	{ name: "Home", href: "/main/dashboard", current: true },
	{ name: "Projects", href: "project", current: false },
];

const navigationButton = [
	{ name: "Home", href: "/main/dashboard", current: true },
	{ name: "Projects", href: "/main/dashboard/project", current: false },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export default function HeaderUI() {
	const [triggerDeleteUser] = useLazyDeleteUserQuery();
	const [triggerLogout] = useLazyLogoutQuery();
	const [DeleteProject] = useDeleteProjectMutation();
	const [load, setLoad] = React.useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const idProject = useSelector(proyekSelector);
	const User = useSelector(userSelector);

	const [modal, setModal] = useState<boolean>(false);
	const [modalChangeps, setModalChangePs] = useState<boolean>(false);
	const [modalProyek, setModalProyek] = useState<boolean>(false);
	const [modalListTeam, setModalListTeam] = useState<boolean>(false);
	const [modalChangeOwner, setChangeOWner] = useState<boolean>(false);
	const [modalDelete, setModalDelete] = useState<boolean>(false);

	const [activated, setActive] = useState<string>("Home");
	const { confirm, setConfirm, onHandle } = useConfirm(false);

	const onClickUserModal = (
		ev:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// ev.preventDefault();
		setModal((prevState) => !prevState);
	};

	const OnHandleMOdalChangePass = () => {
		setModalChangePs((prev) => !prev);
	};

	const OnHandleModalProyek = () => {
		setModalProyek((prev) => !prev);
	};

	const OnHandleChangeOwnerModal = () => {
		setChangeOWner((prev) => !prev);
	};

	const onClickLink = (
		ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		name: string
	) => {
		ev.preventDefault();

		setActive(name);
		const value = navigationButton.find((x) => x.name === name);
		if (value) {
			navigate(value.href);
		}

		dispatch(ResetIdProyek());
		return 0;
	};

	const Reset = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		triggerLogout(null, false)
			.unwrap()
			.then(() => {
				dispatch(ResetUser());
				navigate("/", { replace: true });
			})
			.catch();
	};

	const handleAccept = () => {
		setLoad(true);
		triggerDeleteUser(null, true)
			.unwrap()
			.then(() => {
				setLoad(false);
				setConfirm(false);
				dispatch(ResetUser());
				navigate("/", { replace: true });
			})
			.catch((e) => {
				setLoad(false);
			});
	};

	const handleModalListTeam = () => {
		setModalListTeam((prev) => !prev);
	};

	const DeleteForever = () => {
		setLoad(true);
		DeleteProject(idProject)
			.then(() => {
				setLoad(false);
				setModalDelete((prev) => !prev);
				navigate("/main/dashboard", { replace: true });
			})
			.catch();
	};

	const OpenModalDelete = () => {
		setModalDelete((prev) => !prev);
	};

	return (
		<>
			<InfoModal
				closeModal={onHandle}
				head="Menghapus User"
				msg="Apakah Anda Yakin Untuk Menghapus User?"
				isOpen={confirm}
				onAccept={handleAccept}
				loading={load}
			/>
			<MainListTeam
				closeModal={handleModalListTeam}
				isOpen={modalListTeam}
				idProyek={idProject ?? undefined}
			/>
			<ChangeOwnerForm
				closeModal={OnHandleChangeOwnerModal}
				isOpen={modalChangeOwner}
				idProyek={idProject ?? undefined}
			/>
			<InfoModal
				closeModal={OpenModalDelete}
				head={"Menghapus Proyek"}
				msg={"Apakah Anda Yakin Menghapus Proyek Ini?"}
				isOpen={modalDelete}
				onAccept={DeleteForever}
				loading={load}
			/>
			<Disclosure as="nav" className="bg-blackCustom" key={"1"}>
				{({ open }: any) => (
					<>
						<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
							<div className="relative flex items-center justify-between h-16">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">
											Open main menu
										</span>
										{open ? (
											<XIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<MenuIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
									<div className="flex-shrink-0 flex items-center">
										<img
											className="block lg:hidden h-10 w-auto"
											src={Logo}
											alt="Workflow"
										/>
										<img
											className="hidden lg:block h-10 w-auto"
											src={Logo}
											alt="Workflow"
										/>
									</div>
									<div className="hidden sm:block sm:ml-6">
										<div className="flex space-x-4">
											{navigation.map((item) => {
												if (item.name === activated) {
													return (
														<Link
															to={item.href}
															className={classNames(
																"bg-gray-900 text-white",
																"px-3 py-2 rounded-md text-sm font-medium"
															)}
															key={item.name}
															aria-current={
																"page"
															}
															onClick={(ev) =>
																onClickLink(
																	ev,
																	item.name
																)
															}
														>
															{item.name}
														</Link>
													);
												}
												return (
													<Link
														to={item.href}
														className={classNames(
															"text-gray-300 hover:bg-gray-700 hover:text-white",
															"px-3 py-2 rounded-md text-sm font-medium"
														)}
														key={item.name}
														aria-current={undefined}
														onClick={(ev) =>
															onClickLink(
																ev,
																item.name
															)
														}
													>
														{item.name}
													</Link>
												);
											})}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 justify-around">
									{idProject ? (
										<>
											<button
												type="button"
												className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mx-1"
											>
												<span className="sr-only">
													Team List
												</span>
												<PeopleIcon
													className="h-6 w-6"
													aria-hidden="true"
													onClick={
														handleModalListTeam
													}
												/>
											</button>
											<button
												type="button"
												className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mx-1"
											>
												<span className="sr-only">
													Pindah Kepemilikan
												</span>
												<ChangeCircleIcon
													className="h-6 w-6"
													aria-hidden="true"
													onClick={
														OnHandleChangeOwnerModal
													}
												/>
											</button>
											<button
												type="button"
												className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mx-1"
											>
												<span className="sr-only">
													Hapus Selamanya
												</span>
												<DeleteForeverIcon
													className="h-6 w-6"
													aria-hidden="true"
													onClick={OpenModalDelete}
												/>
											</button>
										</>
									) : (
										<></>
									)}

									<button
										type="button"
										className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-3"
										onClick={OnHandleModalProyek}
									>
										<span className="sr-only">
											Add Proyek
										</span>
										<AddIcon className="h-6 w-6" />
									</button>

									{/* Profile dropdown */}
									<Menu as="div" className="ml-3 relative">
										<div>
											<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
												<span className="sr-only">
													Open user menu
												</span>
												<img
													className="h-8 w-8 rounded-full"
													src={`https://ui-avatars.com/api/?name=${User.user}`}
													alt=""
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
												<Menu.Item>
													{({ active }: any) => (
														<div
															className={classNames(
																active
																	? "bg-gray-100"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
															onClick={
																onClickUserModal
															}
														>
															<p className="pointer-events-none">
																Your Profile
															</p>
														</div>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }: any) => (
														<div
															className={classNames(
																active
																	? "bg-gray-100 cursor-pointer"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
															onClick={Reset}
														>
															<p className="pointer-events-none">
																Sign Out
															</p>
														</div>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }: any) => (
														<div
															className={classNames(
																active
																	? "bg-gray-100 cursor-pointer"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
															onClick={
																OnHandleMOdalChangePass
															}
														>
															<p className="pointer-events-none">
																Change Password
															</p>
														</div>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }: any) => (
														<div
															className={classNames(
																active
																	? "bg-gray-100 cursor-pointer"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
															onClick={onHandle}
														>
															<p className="pointer-events-none">
																Delete User
															</p>
														</div>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden" key={"1"}>
							<div className="px-2 pt-2 pb-3 space-y-1">
								{navigationButton.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
										aria-current={
											item.current ? "page" : undefined
										}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<InfoUserUI setModal={onClickUserModal} modal={modal} />
			<ChangePassword
				closeModal={OnHandleMOdalChangePass}
				isOpen={modalChangeps}
			/>
			<ProyekModal
				setModal={OnHandleModalProyek}
				modal={modalProyek}
				projectId={idProject ?? undefined}
			/>
		</>
	);
}

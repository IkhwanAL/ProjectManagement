/* eslint-disable eqeqeq */
/* eslint-disable no-useless-computed-key */

import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { ProyekKegiatanProps } from "../../Props/Modal.property";
import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	Checkbox,
	IconButton,
	LinearProgress,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Stack,
	Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddProyekDetail from "./ProyekActDet.Component";
import { v4 as uuidv4 } from "uuid";
import { ListTeam } from "./ListTeam.Component";
import { useGetUserTeamQuery } from "../../redux/project/projectApi";
import { useSelector } from "react-redux";
import { proyekSelector } from "../../redux/project/projectSlice";
import {
	useCreateOneMutation,
	useGetAllActivityQuery,
	useLazyGetOneProjectActivityQuery,
	usePatchOneMutation,
} from "../../redux/projectActivity/projectActivityApi";
import { GetOneProjectActivity } from "../../interface/proyek.interface";
import {
	projectactivity,
	projectactivity_position,
	subdetailprojectactivity,
} from "../../types/database.types";
import { useError } from "../../hooks/useError";
import ModalInfo from "../Modal/ErrorModal.Component";

// interface ProjectActivityStateForm extends GetOneProjectActivity {
// 	parentArray: Array<any>;
// 	parentNameActivity: Array<Array<any>>;
// 	subdetailprojectactivity: Array<{ [key: string]: any }>;
// 	ListAcceptTeam: [{}];
// }

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// width: 400,
	bgcolor: "background.paper",
	borderRadius: 5,
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};
/**
 * Pada Form ini Data Yang di Fetch
 * Ada 2 Yaitu Data ProjectActivity Jika Ada
 * Dan Data UserTeam Pada Project Menggunakan IdProject
 * @returns
 */
export const FormKegiatan = ({
	isOpen,
	handleShow,
	idProjectActivity,
	ActivityName,
}: ProyekKegiatanProps) => {
	const idProyek = useSelector(proyekSelector);
	const TeamList = useGetUserTeamQuery(idProyek as number);
	const [triggerFetching] = useLazyGetOneProjectActivityQuery();
	const Activity = useGetAllActivityQuery(idProyek, {
		refetchOnMountOrArgChange: true,
		refetchOnFocus: true,
	});
	const [load, setLoading] = React.useState(false);
	const [progress, setProgress] = React.useState(0);

	const [form, setForm] = useState<{ [key: string]: any }>({});
	const [openDetail, setOpenDetail] = useState(false);
	const [openListTeam, setOpenListTeam] = useState(false);
	const { HandleControlStateError, errorState } = useError({ error: false });

	const [Create] = useCreateOneMutation();
	const [Patch] = usePatchOneMutation();

	const CalcluateProgress = (subdetailprojectactivity: any) => {
		const FindTotalSubDetail = subdetailprojectactivity.length;

		const TotalCompleted = subdetailprojectactivity.filter(
			(x: any) => x.isComplete === true
		).length;

		const Percentage = (TotalCompleted / FindTotalSubDetail) * 100;

		setProgress(Percentage);
	};

	React.useEffect(() => {
		if (idProjectActivity) {
			const subscribing = triggerFetching(idProjectActivity);
			subscribing
				.unwrap()
				.then((x) => {
					const { data } = x;
					if (data) {
						const res = data;

						for (const key in res) {
							if (key === "usertaskfromassignee") {
								setForm((prev) => {
									return {
										...prev,
										["ListAcceptTeam"]: res[key],
									};
								});
							} else if (key === "parent") {
								setForm((prev) => ({
									...prev,
									["parent"]: res[key],
									["parentArray"]: res[key]?.split(","),
								}));
							} else if (key === "ParentActivityName") {
								setForm((prev) => ({
									...prev,
									["parentNameActivity"]: res[key],
								}));
							} else if (key === "status") {
								setForm((prev) => ({
									...prev,
									status: res["status"] ? "aktif" : "unaktif",
								}));
							} else if (key === "subdetailprojectactivity") {
								const temp: (subdetailprojectactivity & {
									id: string;
								})[] = [];

								if (res[key]) {
									const ProjectActivity = res[key];

									if (ProjectActivity) {
										for (const iterator of ProjectActivity) {
											const payload = {
												id: uuidv4(),
												...iterator,
											};

											temp.push(payload);
										}
									}
								}

								setForm((prev) => ({
									...prev,
									["subdetailprojectactivity"]: temp,
								}));

								CalcluateProgress(temp);
							} else {
								setForm((prev) => {
									return {
										...prev,
										[key]: res[
											key as keyof GetOneProjectActivity
										],
									};
								});
							}
						}
					}
				})
				.catch();
		}

		return () => {
			setForm({});
		};
	}, [idProjectActivity, triggerFetching]);

	const OnSubmit = () => {
		setLoading(true);
		const RefactorForm = {} as projectactivity & { [key: string]: any };

		if (form["ListAcceptTeam"]) {
			const ListAcceptTeam = form["ListAcceptTeam"] as Array<any>;

			RefactorForm.usertaskfromassignee = ListAcceptTeam.map(
				(x) => x.idUser
			);
		}

		if (form["parentArray"]) {
			RefactorForm.parent = form["parentArray"].join(",");
		}

		if (form["subdetailprojectactivity"]) {
			const SubDetailProjectActivity = form[
				"subdetailprojectactivity"
			] as Array<any>;

			RefactorForm["subdetailprojectactivity"] =
				SubDetailProjectActivity.map((x) => ({
					subDetailProjectActivityId:
						x?.subDetailProjectActivityId ?? "",
					description: x?.description ?? "",
					isComplete: x?.isComplete ?? "",
					detailProyekId: x.detailProyekId
						? x.detailProyekId
						: idProjectActivity,
				}));
		}

		switch (ActivityName) {
			case "To Do":
				RefactorForm.position = projectactivity_position.To_Do;
				break;
			case "Doing":
				RefactorForm.position = projectactivity_position.Doing;
				break;
			case "Review":
				RefactorForm.position = projectactivity_position.Review;
				break;
			default:
				RefactorForm.position = projectactivity_position.Done;
				break;
		}

		if (!form.name) {
			HandleControlStateError("Data Kosong", "Name Aktifitas Kosong");
			return;
		}

		if (!form.description) {
			HandleControlStateError("Data Kosong", "Deskripsi Kosong");
			return;
		}

		if (!form.status) {
			HandleControlStateError("Data Kosong", "Status Kegiatan Kosong");
			return;
		}

		if (!form.timeToComplete) {
			HandleControlStateError(
				"Data Kosong",
				"Total Waktu Pengerjaan Kosong"
			);
			return;
		}

		RefactorForm.name = form.name;
		RefactorForm.description = form.description;
		RefactorForm.status = form.status === "aktif" ? true : false;
		RefactorForm.timeToComplete = parseInt(form.timeToComplete);

		if (idProjectActivity) {
			RefactorForm.projectActivityId = idProjectActivity;
			Patch({ idProject: idProyek, data: RefactorForm })
				.unwrap()
				.then((succ) => {
					setLoading(false);
					handleShow(ActivityName);
					setForm({});
				})
				.catch();

			return;
		}

		Create({ idProject: idProyek, data: RefactorForm })
			.unwrap()
			.then((succ) => {
				setLoading(false);
				handleShow(ActivityName);
				setForm({});
			})
			.catch((err) => {
				HandleControlStateError("Gagal", "Gagal Membuat Aktifitas");
			});
	};

	const OnClose = () => {
		handleShow(ActivityName);
		setForm({});
	};

	const onOpen = () => {
		setOpenDetail((prev) => !prev);
	};

	const onOpenListTeam = () => {
		setOpenListTeam((prev) => !prev);
	};

	const SaveStateDetailProyekActivity = (ev: string) => {
		const payload = {
			id: uuidv4(),
			subDetailProjectActivityId: "",
			description: ev,
			isComplete: false,
		};
		if (!form["subdetailprojectactivity"]) {
			setForm((prev) => ({
				...prev,
				["subdetailprojectactivity"]: [payload],
			}));
			CalcluateProgress([payload]);
		} else {
			setForm((prev) => ({
				...prev,
				["subdetailprojectactivity"]: [
					...form["subdetailprojectactivity"],
					payload,
				],
			}));
			CalcluateProgress([...form["subdetailprojectactivity"], payload]);
		}
	};

	const OnCheck = (
		ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string
	) => {
		let ChangedData: subdetailprojectactivity & { id: string } = form[
			"subdetailprojectactivity"
		].filter(
			(x: subdetailprojectactivity & { id: string }) => x.id === id
		)[0];

		ChangedData.isComplete = !ChangedData.isComplete;

		const NotChangedData = form["subdetailprojectactivity"].filter(
			(x: any) => x.id !== id
		);

		setForm((prev) => ({
			...prev,
			["subdetailprojectactivity"]: [...NotChangedData, ChangedData],
		}));

		CalcluateProgress([...NotChangedData, ChangedData]);
	};

	const RemoveStateDetailProyekAct = (uuid: any) => {
		setForm((prev) => ({
			...prev,
			["subdetailprojectactivity"]: prev[
				"subdetailprojectactivity"
			].filter((x: any) => x.id !== uuid),
		}));

		CalcluateProgress(
			form["subdetailprojectactivity"].filter((x: any) => x.id !== uuid)
		);
	};

	const OnChangeInputField = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({
			...prev,
			[ev.target.name]: ev.target.value,
		}));
	};

	const OnChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
		if (!form[ev.target.name]) {
			setForm((prev) => ({
				...prev,
				["parentArray"]: [ev.target.value.split(",")[0]],
				["parentNameActivity"]: [ev.target.value.split(",")],
				["parent"]: [ev.target.value.split(",")[0].toString()],
			}));
		} else {
			setForm((prev) => ({
				...prev,
				["parentArray"]: [
					...prev["parentArray"],
					ev.target.value.split(",")[0],
				],
				// eslint-disable-next-line no-useless-computed-key
				["parentNameActivity"]: [
					...prev["parentNameActivity"],
					ev.target.value.split(","),
				],
				["parent"]: [
					...prev["parentArray"],
					ev.target.value.split(",")[0],
				].join(","),
			}));
		}
	};

	const RadioHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			["status"]: ev.target.value,
		}));
	};

	const deletePrevActivity = (id: any) => {
		setForm((prev) => ({
			...prev,
			["parentArray"]: prev["parentArray"].filter((x: any) => x != id),
			["parentNameActivity"]: prev["parentNameActivity"].filter(
				(x: Array<any>) => x[0] != id
			),
			["parent"]: prev["parentArray"]
				.filter((x: any) => x != id)
				.join(","),
		}));
	};

	const SaveListTeam = (
		event: React.ChangeEvent<HTMLInputElement>,
		idUser: number,
		username: string
	) => {
		const payload = {
			idUser: idUser,
			user: {
				username: username,
			},
		};

		if (event.target.checked) {
			if (!form["ListAcceptTeam"]) {
				setForm((prev) => ({
					...prev,
					["ListAcceptTeam"]: [payload],
				}));
			} else {
				setForm((prev) => ({
					...prev,
					["ListAcceptTeam"]: [...form["ListAcceptTeam"], payload],
				}));
			}
		} else {
			setForm((prev) => ({
				...prev,
				["ListAcceptTeam"]: form["ListAcceptTeam"].filter(
					(x: any) => x.idUser !== idUser
				),
			}));
		}
	};

	return (
		<>
			<Modal
				open={isOpen}
				onClose={() => {
					if (handleShow) {
						handleShow(ActivityName);
					}
				}}
			>
				<Box
					sx={{
						...style,
						width: 800,
						height: "100%",
						overflow: "auto",
					}}
				>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<Stack
								direction={"row"}
								justifyContent="space-between"
							>
								<ModalInfo
									closeModal={HandleControlStateError}
									isOpen={errorState.error}
									head={errorState.head as string}
									msg={errorState.msg as string}
								/>
								<AddProyekDetail
									closeModal={onOpen}
									isOpen={openDetail}
									action={SaveStateDetailProyekActivity}
								/>
								<ListTeam
									closeModal={onOpenListTeam}
									isOpen={openListTeam}
									data={TeamList.data?.data}
									dataToCompare={form.ListAcceptTeam}
									action={SaveListTeam}
								/>
								<Typography
									variant="h5"
									textAlign={"center"}
									justifySelf="end"
									// className="text-lg leading-6 font-medium text-gray-900 text-center"
								>
									Kegiatan {ActivityName}
								</Typography>
								<Box>
									<Stack direction={"row-reverse"}>
										{typeof form.ListAcceptTeam !==
											"undefined" &&
										form.ListAcceptTeam.length !== 0 ? (
											form.ListAcceptTeam?.slice(
												0,
												3
											).map(
												(list: any, index: number) => (
													<div
														className={`pb-5 pl-5 bg-opacity-40 rounded-full w-14 h-14 -ml-${
															10 - index
														}`}
													>
														<img
															src={`https://ui-avatars.com/api/?name=${list.user.username}`}
															className="w-full h-full rounded-full border-1 border-primary"
															alt="User"
														/>
													</div>
												)
											)
										) : (
											<></>
										)}
										<div className="pb-5 pl-5  bg-opacity-30 rounded-full w-14 h-14 -	ml-8 ">
											{/* <img
												src="https://ui-avatars.com/api/?name="
												className="w-full h-full rounded-full border-1 border-primary"
												alt="User"
											/> */}

											<IconButton
												color="primary"
												onClick={onOpenListTeam}
											>
												<AddCircleIcon />
											</IconButton>
										</div>
									</Stack>
								</Box>
							</Stack>

							<div className="mt-3">
								<LinearProgress
									sx={{
										borderRadius: 10,
										height: 10,
										width: "100%",
									}}
									variant="determinate"
									value={progress}
								/>
							</div>
							<div className="mt-10">
								<label
									htmlFor="name"
									className="block text-sm  text-gray-700"
								>
									Nama Kegiatan
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={form.name ?? ""}
									onChange={OnChangeInputField}
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
									name="timeToComplete"
									id="timeToComplete"
									value={form.timeToComplete ?? ""}
									onChange={OnChangeInputField}
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
									value={form.description ?? ""}
									id={"description"}
									name="description"
									onChange={OnChangeInputField}
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
									name="parent"
									id=""
									className="mt-1 p-2 block w-full border-1 shadow-sm sm:text-sm border-gray-300 rounded-md"
									value={""}
									onChange={OnChangeSelect}
								>
									<option value="">
										-Pilih Kegiatan Sebelumnya-
									</option>
									{Activity?.data?.data &&
									Activity?.data?.data.length !== 0 ? (
										Activity?.data?.data?.map((x: any) => {
											return (
												<option
													value={[
														x.projectActivityId,
														x.name,
													]}
													key={
														x.projectActivityId + ""
													}
												>
													{x.name}
												</option>
											);
										})
									) : (
										<></>
									)}
									{/* <option value={["A", "Kegiatan A"]}>
										Kegiatan A
									</option>
									<option value={["B", "Kegiatan B"]}>
										Kegiatan B
									</option>
									<option value={["C", "Kegiatan C"]}>
										Kegiatan C
									</option> */}
								</select>
							</div>
							<Box
								borderColor={"gray"}
								border={1}
								my={2}
								borderRadius={4}
							>
								<List dense={false}>
									{form["parentNameActivity"] &&
									form["parentNameActivity"].length !== 0 ? (
										form["parentNameActivity"].map(
											(x: Array<any>) => (
												<ListItem
													secondaryAction={
														<IconButton
															edge={"end"}
															aria-label="delete"
															onClick={() =>
																deletePrevActivity(
																	x[0]
																)
															}
														>
															<DeleteIcon />
														</IconButton>
													}
													key={x[0]}
												>
													<ListItemText
														primary={x[1] as string}
													/>
												</ListItem>
											)
										)
									) : (
										<>
											<Typography textAlign={"center"}>
												Tidak Ada Kegiatan Sebelumnya
											</Typography>
										</>
									)}
								</List>
							</Box>
							<div className="mt-3 p-2">
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
										value={"aktif"}
										checked={
											form.status === "aktif"
												? true
												: false
										}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
										onChange={RadioHandle}
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
										value={"unaktif"}
										checked={
											form.status === "unaktif"
												? true
												: false
										}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
										onChange={RadioHandle}
									/>
									<label
										htmlFor="unaktif"
										className="ml-3 block text-sm font-medium text-gray-700"
									>
										Tidak Aktif
									</label>
								</div>
							</div>
							<Box>
								<Stack
									direction={"row"}
									justifyContent="space-between"
								>
									<Typography mt={2}>
										Daftar Detail Kegiatan
									</Typography>
									<IconButton onClick={onOpen}>
										<CreateIcon />
									</IconButton>
								</Stack>
							</Box>
							<Box
								borderColor={"gray"}
								border={1}
								my={2}
								borderRadius={4}
							>
								<List dense={false}>
									{form["subdetailprojectactivity"] &&
									form["subdetailprojectactivity"].length !==
										0 ? (
										form["subdetailprojectactivity"].map(
											(x: any) => (
												<>
													<ListItem
														secondaryAction={
															<>
																<IconButton
																	edge={"end"}
																	aria-label="delete"
																	onClick={() =>
																		RemoveStateDetailProyekAct(
																			x.id
																		)
																	}
																>
																	<DeleteIcon />
																</IconButton>
															</>
														}
														key={x.id}
													>
														<ListItemButton>
															<ListItemIcon>
																<Checkbox
																	edge="start"
																	tabIndex={
																		-1
																	}
																	disableRipple={
																		true
																	}
																	onClick={(
																		ev
																	) =>
																		OnCheck(
																			ev,
																			x.id
																		)
																	}
																	checked={
																		x.isComplete
																	}
																/>
															</ListItemIcon>
															<ListItemText
																primary={
																	x.description
																}
															/>
														</ListItemButton>
													</ListItem>
												</>
											)
										)
									) : (
										<>
											<Typography textAlign={"center"}>
												Tidak Ada Kegiatan Detail
											</Typography>
										</>
									)}
								</List>
							</Box>
						</div>
					</div>
					<Stack direction={"row"} justifyContent="space-between">
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<Button
								variant="contained"
								onClick={OnClose}
								color="secondary"
							>
								Tutup
							</Button>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<LoadingButton
								variant="contained"
								onClick={OnSubmit}
								loading={load}
							>
								Simpan
							</LoadingButton>
						</div>
					</Stack>
				</Box>
			</Modal>
		</>
	);
};

import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	FormControl,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QueryArgProject } from "../../types/arg.types";
import { useError } from "../../hooks/useError";
import { useSuccess } from "../../hooks/useSuccess";
import { ModalPropsUI } from "../../Props/Modal.property";
import { useLazyRefreshTokenQuery } from "../../redux/auth/authApi";
import {
	useCreateProjectMutation,
	usePatchProjectMutation,
	useLazyGetOneProjectNoCalcQuery,
} from "../../redux/project/projectApi";
import { proyekSelector, SetIdProyek } from "../../redux/project/projectSlice";
import AnyModal from "../Modal/Any.Component";

export default function ProyekForm({
	setModal,
	projectId,
}: ModalPropsUI & { projectId?: number }) {
	const [CreateProject, CreateHooks] = useCreateProjectMutation();

	const [PatchProject, PatchHooks] = usePatchProjectMutation();

	const [triggerRefresh] = useLazyRefreshTokenQuery();

	const [triggerGetProyek, HooksGet] = useLazyGetOneProjectNoCalcQuery();

	const initial: Partial<QueryArgProject & { projectId: number | null }> = {
		projectId: projectId ? projectId : null,
		projectName: "",
		projectDescription: "",
		startDate: "",
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { setErrorState, errorState } = useError({ error: false });
	const { successState, setSuccessState } = useSuccess({ error: true });

	const [proyek, setProyek] =
		React.useState<Partial<QueryArgProject & { projectId: number | null }>>(
			initial
		);

	const OnChangeTextField = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProyek((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
	};

	React.useEffect(() => {
		if (CreateHooks.isSuccess) {
			const id = CreateHooks.data.data?.projectId;
			dispatch(SetIdProyek(id));
			setSuccessState({
				error: false,
				head: "Berhasil",
				msg: "Berhasil Membuat ",
			});
			setModal("asd");
			navigate(`project/detail/${id}`);
		}
		if (PatchHooks.isSuccess) {
			setSuccessState({
				error: false,
				head: "Berhasil",
				msg: "Berhasil Memperbarui",
			});
			dispatch(SetIdProyek(PatchHooks.data.data?.projectId));
		}
	}, [CreateHooks.isSuccess, PatchHooks.isSuccess]);

	React.useEffect(() => {
		const err = CreateHooks.error as { [key: string]: any };
		if (CreateHooks.isError) {
			if (err?.status === "FETCH_ERROR") {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal Membuat Proyek baru",
					msg: "Terjadi Kesalahan Pada jaringan",
				});
			} else if (err.data.data.name === "TokenExpire") {
				triggerRefresh(null, true)
					.unwrap()
					.then(() => {
						if (proyek.projectId) {
							PatchProject({
								projectId: proyek.projectId,
								projectName: proyek.projectName,
								projectDescription: proyek.projectDescription,
							}).unwrap();
						} else {
							const { projectId, ...rest } = proyek;
							CreateProject(rest).unwrap();
						}
					})
					.catch(() => {
						setErrorState({
							error: true,
							head: "Gagal Memperbarui Data",
							msg: "Terjadi Kesalahan Pada Server",
							action: () => navigate("/", { replace: true }),
						});
					});
			} else {
				setErrorState({
					...errorState,
					error: true,
					head: "Gagal Membuat Proyek baru",
					msg: err.data.message ?? "Terjadi Kesalahan Pada Server",
				});
			}
		}
	}, [CreateHooks.isError, PatchHooks.isError]);

	const onHandleSubmit = () => {
		if (!proyek.projectName) {
			setErrorState({
				error: true,
				head: "Data Kosong",
				msg: "Nama Proyek Kosong",
			});

			return;
		}

		if (!proyek.projectDescription) {
			setErrorState({
				error: true,
				head: "Data Kosong",
				msg: "Deskripsi Proyek Kosong",
			});

			return;
		}

		if (!proyek.startDate) {
			setErrorState({
				error: true,
				head: "Data Kosong",
				msg: "Waktu Mulai Pengerjaan Kosong",
			});

			return;
		}

		console.log(new Date(proyek.startDate));

		if (proyek.projectId) {
			console.log(proyek);
			PatchProject({
				projectId: proyek.projectId,
				projectName: proyek.projectName,
				projectDescription: proyek.projectDescription,
				startDate: new Date(proyek.startDate),
			});
		} else {
			const { projectId, ...rest } = proyek;
			const payload = {
				projectName: rest.projectName,
				projectDescription: rest.projectDescription,
				startDate: new Date(proyek.startDate),
			};
			CreateProject(payload);
		}
	};
	React.useEffect(() => {
		// if (HooksGet.isFetching && HooksGet.isSuccess) {
		if (projectId) {
			triggerGetProyek(projectId, false)
				.unwrap()
				.then((res) => {
					let date = "";
					if (res.data?.startDate) {
						const time = res.data.startDate;
						date = `${new Date(time).getFullYear()}-${
							new Date(time).getMonth() + 1 < 10
								? "0" + (new Date(time).getMonth() + 1)
								: new Date(time).getMonth() + 1
						}-${new Date(time).getDate()}`;
					}

					setProyek({
						projectId: res.data?.projectId,
						projectName: res.data?.projectName,
						projectDescription: res.data?.projectDescription,
						startDate: date,
					});
				})
				.catch(console.warn);
		}
		// }
	}, []);

	const OnCloseErrorModal = () => {
		setErrorState({
			error: false,
			head: undefined,
			msg: undefined,
		});
	};

	const OnCloseSuccessErrorModal = () => {
		setSuccessState({
			error: true,
			head: null,
			msg: null,
		});
	};

	return (
		<>
			<AnyModal
				isOpen={errorState.error}
				closeModal={OnCloseErrorModal}
				head={errorState.head as string}
				msg={errorState.msg as string}
			/>

			<AnyModal
				isOpen={!successState.error}
				closeModal={OnCloseSuccessErrorModal}
				head={successState.head as string}
				msg={successState.msg as string}
			/>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				mt={3}
			>
				<Typography variant="h4">
					{" "}
					{projectId ? "Update Proyek" : "Proyek Baru"}
				</Typography>
			</Box>
			<Box
				component={"form"}
				autoComplete={"off"}
				margin={10}
				mt="0"
				noValidate
			>
				<Stack>
					<FormControl>
						<TextField
							label="Nama Proyek"
							margin="normal"
							name="projectName"
							onChange={OnChangeTextField}
							value={proyek.projectName}
							id="projectName"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Deskripsi Proyek"
							margin="normal"
							name="projectDescription"
							onChange={OnChangeTextField}
							value={proyek.projectDescription}
							id="projectDescription"
							InputLabelProps={{
								shrink: true,
							}}
							multiline
							rows={3}
						/>
					</FormControl>
					<FormControl>
						<TextField
							label="Waktu Mulai"
							margin="normal"
							name="startDate"
							onChange={OnChangeTextField}
							value={proyek.startDate}
							id="startDate"
							InputLabelProps={{
								shrink: true,
							}}
							type="date"
						/>
					</FormControl>
				</Stack>
				<Stack direction={"row"} justifyContent="space-between" mt={3}>
					<Button
						variant="contained"
						onClick={setModal}
						color="secondary"
					>
						Cancel
					</Button>
					<LoadingButton
						variant="contained"
						onClick={onHandleSubmit}
						loading={PatchHooks.isLoading || CreateHooks.isLoading}
					>
						Simpan
					</LoadingButton>
				</Stack>
			</Box>
		</>
	);
}

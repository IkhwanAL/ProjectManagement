import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	InputLabelProps,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QueryArgProject } from "../../@types/arg.types";
import { useError } from "../../hooks/useError";
import { ModalPropsUI } from "../../Props/Modal.property";
import { useLazyRefreshTokenQuery } from "../../redux/auth/authApi";
import {
	useCreateProjectMutation,
	usePatchProjectMutation,
} from "../../redux/project/projectApi";
import { SetIdProyek } from "../../redux/project/projectSlice";
import AnyModal from "../Modal/Any.Component";

export default function ProyekForm({
	setModal,
	projectId,
}: ModalPropsUI & { projectId?: number }) {
	const [CreateProject, CreateHooks] = useCreateProjectMutation();

	const [PatchProject, PatchHooks] = usePatchProjectMutation();

	const [triggerRefresh] = useLazyRefreshTokenQuery();

	const initial: QueryArgProject & { projectId?: number } = {
		projectId: projectId ? projectId : undefined,
		projectName: "",
		projectDescription: "",
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { setErrorState, errorState } = useError({ error: false });
	const [proyek, setProyek] = React.useState<
		QueryArgProject & { projectId?: number }
	>(initial);

	const OnChangeTextField = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProyek((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
	};
	console.log(proyek);
	React.useEffect(() => {
		if (CreateHooks.isSuccess) {
			const id = CreateHooks.data.data?.projectId;
			dispatch(SetIdProyek(id));
			setModal("asd");
			navigate(`project/detail/${id}`);
		}
		if (PatchHooks.isSuccess) {
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
							PatchProject(proyek).unwrap();
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
		if (proyek.projectId) {
			PatchProject(proyek);
		} else {
			const { projectId, ...rest } = proyek;
			CreateProject(rest);
		}
	};

	return (
		<>
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
							value={proyek?.projectName}
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
							value={proyek?.projectDescription}
							id="projectDescription"
							InputLabelProps={{
								shrink: true,
							}}
							multiline
							rows={3}
							maxRows={4}
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
						Save
					</LoadingButton>
				</Stack>
			</Box>
		</>
	);
}

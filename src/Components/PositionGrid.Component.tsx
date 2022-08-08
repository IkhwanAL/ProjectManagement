import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Droppable } from "react-beautiful-dnd";
import { ProjectActicityForState } from "../types/project.types";
import { CardActivities } from "./CardActivity.Component";
import { FormKegiatan } from "../Components/Form/KegiatanForm.Component";
import { useSelector } from "react-redux";
import { proyekActSelector } from "../redux/projectActivity/projectActivitySlice";
import { useDeleteProjectActivityMutation } from "../redux/projectActivity/projectActivityApi";
import { useSuccess } from "../hooks/useSuccess";
import ModalInfo from "./Modal/ErrorModal.Component";
import { useError } from "../hooks/useError";
import { proyekSelector } from "../redux/project/projectSlice";
import ConfirmModal from "./Modal/ConfirmModal.Component";

interface GridPositionProps {
	handleShow: (arg?: any) => any; // untuk Form
	positionName: string;
	positionDesc: string;
	positionData: Array<ProjectActicityForState>;
}

export const GridPosition = ({
	handleShow,
	positionDesc,
	positionData,
	positionName,
}: GridPositionProps) => {
	const ProjectId = useSelector(proyekSelector);
	const [DeleteProjectActivity] = useDeleteProjectActivityMutation();
	const { successState, HandleControlStateSuccess } = useSuccess({
		error: true,
	});

	const [idProjectActivity, setIdProjectActivity] = React.useState<
		number | string
	>("");

	const [openConfirm, setOpenConfirm] = React.useState(false);

	const { errorState, HandleControlStateError } = useError({ error: false });

	const OnDelete = (idProjectActivity: number | string) => {
		setOpenConfirm((prev) => !prev);
		setIdProjectActivity(idProjectActivity);
	};

	const Delete = () => {
		const payload = {
			idProjectActivity: idProjectActivity,
			ProjectId: ProjectId,
		};
		DeleteProjectActivity(payload)
			.unwrap()
			.then(() => {
				HandleControlStateSuccess(
					"Sukses",
					"Sukses Menghapus Aktifitas"
				);
			})
			.catch((err) => {
				if (err.status === 401) {
					HandleControlStateError(
						"Gagal",
						err.data.message + " Untuk Menghapus" ??
							"Terjadi Kesalahan Pada Server"
					);
					return;
				}
				HandleControlStateError("Gagal", "Gagal Menghapus Aktifitas");
			})
			.finally(() => {
				setIdProjectActivity("");
				setOpenConfirm((prev) => !prev);
			});
	};

	return (
		<>
			<ModalInfo
				closeModal={HandleControlStateSuccess}
				isOpen={!successState.error}
				head={successState.head as string}
				msg={successState.msg as string}
			/>
			<ModalInfo
				closeModal={HandleControlStateError}
				isOpen={errorState.error}
				head={errorState.head as string}
				msg={errorState.msg as string}
			/>
			<ConfirmModal
				isOpen={openConfirm}
				cancelAction={OnDelete}
				confirmAction={Delete}
				head="Menghapus Aktifitas"
				msg="Apakah Anda Yakin Menghapus Aktifitas ?"
			/>
			<Droppable droppableId={positionName}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
							<div className="flex justify-between items-center">
								<h3 className="text-center font-bold">
									{positionDesc}
								</h3>
								<button
									onClick={() => handleShow(positionDesc)}
								>
									<PlusIcon width={20} />
								</button>
							</div>
							{positionData ? (
								positionData.map((x) => (
									<CardActivities
										handleShow={handleShow}
										ActivtyName={positionDesc}
										name={x.name}
										projectActivityId={x.projectActivityId}
										projectId={x.projectId}
										critical={x.critical}
										position={x.position}
										timeToComplete={x.timeToComplete}
										status={x.status}
										description={x.description}
										progress={x.progress}
										f={x.f}
										subdetailprojectactivity={
											x.subdetailprojectactivity
										}
										key={"" + x.projectActivityId}
										OnDelete={OnDelete}
										stats={x.stats}
										timeDate={x.timeDate}
									/>
								))
							) : (
								<></>
							)}
							{provided.placeholder}
						</div>
					</div>
				)}
			</Droppable>
		</>
	);
};

import React from "react";
import { useDispatch } from "react-redux";
import CardProject from "../Components/Card.Component";
import { ISuccess } from "../interface/return.interface";
import { useGetAllProjectQuery } from "../redux/project/projectApi";
import { ResetIdProyek } from "../redux/project/projectSlice";
import { GetAllProjectReturn } from "../types/return.types";

const ProjectPage = () => {
	const { data, isLoading, isFetching, isSuccess } =
		useGetAllProjectQuery(null);

	const [showsData, setShowsData] =
		React.useState<ISuccess<GetAllProjectReturn>>();

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(ResetIdProyek());
	}, []);

	React.useEffect(() => {
		if (isSuccess || !isFetching) {
			if (data) {
				setShowsData(data);
			}
		}
	}, [isSuccess, isFetching]);

	return (
		<>
			<div className={`flex-col`}>
				<div className="pt-10">
					<p className="text-center text-2xl font-semibold text-blackCustom pb-10">
						PROYEK
					</p>
					<div className="flex content-start flex-wrap items-center justify-center">
						{showsData?.data?.map((x) => {
							return (
								<CardProject
									user={{ username: x.user.username }}
									key={"" + x.projectId}
									projectId={x.projectId}
									startDate={x.startDate}
									projectDescription={x.projectDescription}
									deadline={x.deadline}
									projectName={x.projectName}
									recent={false}
									deadlineInString={x.deadlineInString}
									userteam={x.userteam}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectPage;

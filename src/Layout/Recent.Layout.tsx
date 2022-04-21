import React from "react";
import { useDispatch } from "react-redux";
import CardProject from "../Components/Card.Component";
import { useGetAllProjectQuery } from "../redux/project/projectApi";
import { ResetIdProyek } from "../redux/project/projectSlice";

const MAX_NUMBER = 4;
const RecentPage = () => {
	const { data, isLoading, isFetching } = useGetAllProjectQuery(null, {
		pollingInterval: 100 * 60,
	});
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(ResetIdProyek());
	}, []);
	return (
		<>
			<div className={`flex-col`}>
				<div className="pt-10 pb-10">
					<p className="text-center text-2xl font-semibold text-blackCustom pb-10">
						PROYEK TERKINI
					</p>
					<div className="flex content-start flex-wrap items-center justify-center">
						{data?.data?.map((x) => {
							return (
								<CardProject
									user={{ username: x?.user?.username }}
									key={"" + x?.projectId}
									projectId={x?.projectId}
									projectDescription={x?.projectDescription}
									deadline={x?.deadline}
									projectName={x?.projectName}
									recent={true}
									deadlineInString={x?.deadlineInString}
									userteam={x?.userteam}
								/>
							);
						})}
					</div>
				</div>
				{/* <div className="pt-10 pb-10">
					<p className="text-center text-2xl font-semibold text-blackCustom pb-10">
						AKTIFITAS TERBARU
					</p>
					<div className="flex content-start flex-wrap items-center justify-center">
						{sliceData.map((x) => {
							return (
								<CardProject
									owner={x.owner}
									key={"" + x.id}
									id={x.id}
									description={x.description}
									projectName={x.projectName}
									recent={true}
								/>
							);
						})}
					</div>
				</div> */}
			</div>
		</>
	);
};

export default RecentPage;

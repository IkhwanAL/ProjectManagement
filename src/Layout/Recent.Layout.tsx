import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import CardProject from "../Components/Card.Component";
import { ISuccess } from "../interface/return.interface";
import { useGetAllProjectQuery } from "../redux/project/projectApi";
import { ResetIdProyek } from "../redux/project/projectSlice";
import { GetAllProjectReturn } from "../types/return.types";

const MAX_NUMBER = 4;
const RecentPage = () => {
	const { data, isLoading, isFetching, isSuccess } = useGetAllProjectQuery(
		null,
		{
			refetchOnFocus: true,
			pollingInterval: 1000 * 60 * 3,
		}
	);

	const [showsData, setShowsData] =
		React.useState<ISuccess<GetAllProjectReturn>>();

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(ResetIdProyek());
	}, [dispatch]);

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
				<div className="pt-10 pb-10">
					<p className="text-center text-2xl font-semibold text-blackCustom pb-10">
						PROYEK TERKINI
					</p>
					{isFetching ? (
						<Box
							sx={{
								width: "100%",
							}}
						>
							<LinearProgress />
						</Box>
					) : (
						<></>
					)}
					<div className="flex content-start flex-wrap items-center justify-center">
						{showsData?.data?.slice(0, MAX_NUMBER).map((x) => {
							return (
								<CardProject
									user={{ username: x?.user?.username }}
									key={"" + x?.projectId}
									startDate={x?.startDate}
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

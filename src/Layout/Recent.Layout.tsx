import CardProject from "../Components/Card.Component";
import { useGetAllProjectQuery } from "../redux/project/projectApi";
import Data from "../_mock/_recent.json";

const MAX_NUMBER = 4;
const RecentPage = () => {
	const { data, isLoading, isFetching } = useGetAllProjectQuery(null, {
		pollingInterval: 100 * 60,
	});
	console.log(data);
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
									owner={x.user.username}
									key={"" + x.projectId}
									id={x.projectId}
									description={x.projectDescription}
									dueDate={x.deadlineInString}
									projectName={x.projectName}
									recent={true}
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

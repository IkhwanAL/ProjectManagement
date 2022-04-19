import CardProject from "../Components/Card.Component";
import { useGetAllProjectQuery } from "../redux/project/projectApi";
import fullData from "../_mock/_recent.json";

const ProjectPage = () => {
	const { data, isLoading, isFetching } = useGetAllProjectQuery(null);
	return (
		<>
			<div className={`flex-col`}>
				<div className="pt-10">
					<p className="text-center text-2xl font-semibold text-blackCustom pb-10">
						PROYEK
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

import CardProject from "../Components/Card.Component";
import fullData from "../_mock/_recent.json";

const ProjectPage = () => {
	return (
		<>
			<div
				className={`flex-col bg-gradient-to-br from-blue-600 to-indigo-600 min-h-screen`}
			>
				<div className="pt-10">
					<p className="text-center text-2xl font-semibold text-gray-100 pb-10">
						PROYEK
					</p>
					<div className="flex content-start flex-wrap items-center justify-center">
						{fullData.map((x) => {
							return (
								<CardProject
									owner={x.owner}
									key={"" + x.id}
									id={x.id}
									description={x.description}
									dueDate={x.dueDate}
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

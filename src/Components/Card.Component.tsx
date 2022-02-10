import { Link } from "react-router-dom";
import { ProjectData } from "../Props/Project.property";

const CardProject = (project: ProjectData) => {
	const link = project.recent
		? `project/detail/${project.id}`
		: `detail/${project.id}`;
	return (
		<div className="text-gray-700 max-w-md w-80 my-auto mx-auto ml-5 mr-5 mt-5 mb-5 bg-gray-100 p-4 py-5 px-5 rounded-xl hover:shadow-md hover:shadow-slate-300">
			<Link to={link}>
				<div className="flex justify-between">
					<div>
						<h2 className="text-lg"> {project.projectName} </h2>
					</div>
					<div className="flex items-center ">
						<div className="p-5 bg-gray-800 bg-opacity-40 rounded-full"></div>
						<div className="p-5 bg-gray-700 bg-opacity-30 rounded-full -ml-8"></div>
						<div className="p-5 bg-gray-600 bg-opacity-30 rounded-full -ml-7"></div>
					</div>
				</div>
				<div className="mt-5 flex justify-between items-center w-52">
					<span>{project.description}</span>
				</div>
				<div className="flex justify-between mt-5 w-48 ">
					<div>
						<h3 className="text-xs"> Owner </h3>
						<p className="font-bold"> {project.owner} </p>
					</div>
					<div>
						<h3 className="text-xs"> Due Date </h3>
						<p className="font-bold">
							{project.dueDate ? project.dueDate : " "}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CardProject;

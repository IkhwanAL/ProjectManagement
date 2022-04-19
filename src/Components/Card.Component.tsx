import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProjectData } from "../Props/Project.property";
import { SetIdProyek } from "../redux/project/projectSlice";

const CardProject = (project: ProjectData) => {
	const link = project.recent
		? `project/detail/${project.id}`
		: `detail/${project.id}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const OnHandleProyek = (id: number) => {
		dispatch(SetIdProyek(id));
		navigate(link, { replace: false });
	};

	return (
		<div className="text-black max-w-md w-80 my-auto mx-auto ml-5 mr-5 mt-5 mb-5 bg-white p-4 py-5 px-5 rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-400 ">
			<button onClick={() => OnHandleProyek(project.id)}>
				<div className="flex justify-between">
					<div>
						<h2 className="text-lg"> {project.projectName} </h2>
					</div>
					<div className="flex items-center ">
						<div className="pb-5 pl-5 bg-opacity-40 rounded-full w-14 h-14 -ml-10">
							<img
								src="https://ui-avatars.com/api/?name=Ikhwan"
								className="w-full h-full rounded-full border-1 border-primary"
								alt="User"
							/>
						</div>
						<div className="pb-5 pl-5 bg-opacity-30 rounded-full w-14 h-14 -ml-9 ">
							<img
								src="https://ui-avatars.com/api/?name=Ananda"
								className="w-full h-full rounded-full border-1 border-primary"
								alt="User"
							/>
						</div>
						<div className="pb-5 pl-5  bg-opacity-30 rounded-full w-14 h-14 -ml-8 ">
							<img
								src="https://ui-avatars.com/api/?name=Abi"
								className="w-full h-full rounded-full border-1 border-primary"
								alt="User"
							/>
						</div>
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
			</button>
		</div>
	);
};

export default CardProject;

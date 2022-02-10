import { useParams } from "react-router-dom";

const OneProject = () => {
	const { idProject } = useParams();
	return (
		<>
			<div className="w-full h-full">One Project {idProject}</div>
		</>
	);
};

export default OneProject;

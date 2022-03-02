import { useParams } from "react-router-dom";
import { Connected, socket } from "../app/socket";

const OneProject = () => {
	const { idProject } = useParams();

	Connected();

	socket.on("init", ({ data }) => {
		alert(data);
	});
	return (
		<>
			<div className="w-full h-full">One Project {idProject}</div>
		</>
	);
};

export default OneProject;

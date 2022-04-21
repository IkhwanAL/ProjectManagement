import { PlusIcon } from "@heroicons/react/solid";
import { Droppable } from "react-beautiful-dnd";
import { ProjectActicityForState } from "../types/project.types";
import { CardActivities } from "./CardActivity.Component";

interface GridPositionProps {
	handleShow: (arg?: any) => any;
	positionName: string;
	positionDesc: string;
	positionData: Array<ProjectActicityForState>;
}

export const GridPosition = ({
	handleShow,
	positionDesc,
	positionData,
	positionName,
}: GridPositionProps) => {
	return (
		<>
			<Droppable droppableId={positionName}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
							<div className="flex justify-between items-center">
								<div></div>
								<h3 className="text-center font-bold">
									{positionDesc}
								</h3>
								<button onClick={handleShow}>
									<PlusIcon width={20} />
								</button>
							</div>
							{positionData ? (
								positionData.map((x) => (
									<CardActivities
										handleShow={handleShow}
										name={x.name}
										projectActivityId={x.projectActivityId}
										projectId={x.projectId}
										critical={x.critical}
										position={x.position}
										timeToComplete={x.timeToComplete}
										status={x.status}
										description={x.description}
										progress={x.progress}
										f={x.f}
										subdetailprojectactivity={
											x.subdetailprojectactivity
										}
										key={"" + x.projectActivityId}
									/>
								))
							) : (
								<></>
							)}
							{provided.placeholder}
						</div>
					</div>
				)}
			</Droppable>
		</>
	);
};

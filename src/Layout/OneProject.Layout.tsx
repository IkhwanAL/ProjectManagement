import { useParams } from "react-router-dom";
import { Connected, socket } from "../app/socket";
import { PencilAltIcon } from "@heroicons/react/outline";

const OneProject = () => {
  const { idProject } = useParams();

  Connected();

  socket.on("init", ({ data }) => {
    alert(data);
  });
  return (
    <>
      <div className="w-full h-screen max-w-7xl mx-auto">
        <div className="grid grid-cols-4">
          <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
            <h3 className="text-center font-bold">To Do</h3>

            <div className="bg-white p-3 mt-5 rounded-xl">
              <div className="flex justify-between">
                <h4 className="font-bold">Create UI/UX</h4>
                <button>
                  <PencilAltIcon color="black" />
                </button>
              </div>
              <p className="text-gray-600">Dekripsi Singkat</p>

              <div className="mt-3">
                <p className="text-gray-600 mb-2">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
            <h3 className="text-center font-bold">Doing</h3>
          </div>
          <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
            <h3 className="text-center font-bold">Review</h3>
          </div>
          <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
            <h3 className="text-center font-bold">Done</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneProject;

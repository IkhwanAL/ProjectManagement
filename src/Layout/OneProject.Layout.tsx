import { useParams } from "react-router-dom";
import { Connected, socket } from "../app/socket";
import { PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { useState, Fragment } from "react";
import { Dialog } from "@headlessui/react";

const OneProject = () => {
  const { idProject } = useParams();
  let [isOpen, setIsOpen] = useState(false);

  Connected();

  socket.on("init", ({ data }) => {
    alert(data);
  });
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Deactivate account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Deactivate
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="w-full h-screen max-w-7xl mx-auto">
        <div className="grid grid-cols-4">
          <div>
            <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
              <div className="flex justify-between items-center">
                <div></div>
                <h3 className="text-center font-bold">To Do</h3>
                <button>
                  <PlusIcon width={20} />
                </button>
              </div>

              <div className="bg-white p-3 mt-5 rounded-xl">
                <div className="flex justify-between">
                  <h4 className="font-bold">Create UI/UX</h4>
                  <button onClick={() => setIsOpen(true)}>Edit</button>
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
          </div>
          <div>
            <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
              <div className="flex justify-between items-center">
                <div></div>
                <h3 className="text-center font-bold">Doing</h3>
                <button>
                  <PlusIcon width={20} />
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
              <div className="flex justify-between items-center">
                <div></div>
                <h3 className="text-center font-bold">Review</h3>
                <button>
                  <PlusIcon width={20} />
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="shadow bg-gray-100 p-3 m-4 overflow-auto">
              <div className="flex justify-between items-center">
                <div></div>
                <h3 className="text-center font-bold">Done</h3>
                <button>
                  <PlusIcon width={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneProject;

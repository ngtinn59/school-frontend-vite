import { useState } from "react";
import Divider from "./Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

type Props = {
  buttonContent?: React.ReactNode | string;
  buttonClassName?: string;
  title: string;
  handleSave: () => void;
  children: React.ReactNode;
};
export default function Modal({
  buttonContent,
  buttonClassName,
  title,
  handleSave,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSave = () => {
    handleSave();
    toggleModal();
  };

  return (
    <>
      {/* Button to toggle the modal */}
      {
        <button
          onClick={toggleModal}
          className={` py-2 px-4 rounded ${buttonClassName}`}
        >
          {buttonContent || "Open Modal"}
        </button>
      }

      {/* Modal */}
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 flex flex-row justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="w-full inline-flex justify-center  sm:w-auto text-bold hover:text-black text-xl"
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              <Divider /> <div className="mt-2 px-4">{children}</div>
              <Divider />
              <div className="bg-white px-4 pb-5 flex flex-row justify-end items-center gap-2">
                <Button
                  className="px-4 py-2 rounded-sm !text-gray-500 !border-none hover:!text-bold hover:!bg-gray-100"
                  buttonType="outline"
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
                <Button className="px-6 py-2 rounded-sm" onClick={onSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

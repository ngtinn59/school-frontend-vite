import { useState } from "react";
import Divider from "./Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

type Props = {
  buttonContent?: React.ReactNode | string;
  buttonClassName?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  title: string;
  handleSave: () => void;
  onClose?: () => void;
  width?: string | number;
  children?: React.ReactNode;
  okText?: string;
  cancelText?: string;
};
export default function Modal({
  buttonContent,
  buttonClassName,
  title,
  handleSave,
  buttonProps,
  onClose,
  okText,
  cancelText,
  width,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (onClose) {
      onClose();
    }
  };

  const onSave = () => {
    handleSave();
    toggleModal();
  };

  const widthStyle =
    typeof width === "number"
      ? { maxWidth: `${width}px` }
      : typeof width === "string"
        ? { maxWidth: width }
        : undefined;

  return (
    <>
      {/* Button to toggle the modal */}
      {
        <button
          onClick={toggleModal}
          className={`rounded px-4 py-2 ${buttonClassName}`}
          {...buttonProps}
        >
          {buttonContent || "Open Modal"}
        </button>
      }

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              style={widthStyle}
            >
              <div className="flex flex-row items-center justify-between bg-white px-4 pt-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="inline-flex w-full justify-center text-xl text-bold hover:text-black sm:w-auto"
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              <Divider /> <div className="mt-2 px-4">{children}</div>
              <Divider />
              <div className="flex flex-row items-center justify-end gap-2 bg-white px-4 pb-5">
                <Button
                  className="rounded-sm !border-none px-4 py-2 !text-gray-500 hover:!bg-gray-100 hover:!text-bold"
                  buttonType="outline"
                  onClick={toggleModal}
                >
                  {cancelText || "Cancel"}
                </Button>
                <Button className="rounded-sm px-6 py-2" onClick={onSave}>
                  {okText || "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

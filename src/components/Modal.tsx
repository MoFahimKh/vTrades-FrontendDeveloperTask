import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import icon from "../assets/message-icon.svg";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,

  title = "Action Completed!",
  description = "The action was successful. You can continue using the app.",
  buttonText = "Okay",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#ffffff87]">
      <div className="bg-[#1E1E2F] text-white rounded-2xl p-8 w-[500px] h-[409px] shadow-lg text-center">
        {icon && (
          <div className="flex justify-center mt-10 mb-8">
            <img src={icon} alt="Modal Icon" className="w-[70px]" />
          </div>
        )}
        <h2 className="text-lg font-semibold mb-6">{title}</h2>
        <p className="text-sm text-gray-300 mb-6">{description}</p>
        {children}
        <div className="flex justify-end ">
          <Button
            style={{ width: "100px" }}
            onClick={onClose}
            className="bg-[#8854C0] hover:bg-purple-600 text-white px-6 py-2 rounded-md font-medium transition"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

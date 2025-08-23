import { useEffect } from "react";
import {IoClose} from "@/icons"
export default function Modal({ isOpen, onClose, children, title = "" }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40 bg-opacity-50 backdrop-blur-sm text-[#1e1e1f] "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg   w-full sm:w-10/12 md:w-9/12 lg:w-8/12 mx-4 max-h-[90vh] flex flex-col animate-modalShow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4   flex justify-between items-center text-2xl sm:text-3xl font-bold mb-2 text-center shadow-md  bg-white rounded-md w-full mx-auto">
          <div className="opacity-70">{title ? title : "🛍️ Nearest Shops"}</div>
          <button
            onClick={onClose}
            className="text-[#2b2b2b] hover:text-gray-600 text-xl shadow rounded-full w-7 h-7 flex items-center hover:bg-primary/40 justify-center"
          >
            <IoClose />
          </button>
        </div>

        {/* Scrollable Body only when overflow happens */}
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        <div className="px-6 py-4 text-right">
          {/* <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
}

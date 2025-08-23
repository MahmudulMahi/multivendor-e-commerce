import React, { createContext, useContext, useState } from "react";

const DeleteModalContext = createContext();

export const useDeleteModal = () => useContext(DeleteModalContext);

export const DeleteModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});
  const [message, setMessage] = useState(
    "Are you sure you want to delete this item?"
  );

  const openModal = (onConfirm, customMessage) => {
    setMessage(customMessage || "Are you sure you want to delete this item?");
    setOnConfirmCallback(() => onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirm = () => {
    onConfirmCallback();
    closeModal();
  };

  return (
    <DeleteModalContext.Provider value={{ openModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-lg transform transition-all scale-100 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {/* Red Circle with X */}
            <div className="flex items-center justify-center mx-auto mb-4 w-20 h-20">
              <div className="w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center animate-border-grow">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-gray-800">
              Are you sure?
            </h2>

            {/* Description */}
            <p className="text-sm text-center text-gray-600 mt-2">
              {message} <br />
              This process cannot be undone.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirm}
                className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DeleteModalContext.Provider>
  );
};
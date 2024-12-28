import React from "react";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ closeModal, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-8 rounded shadow-lg w-2/3 max-w-full max-h-[60vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
          onClick={closeModal}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

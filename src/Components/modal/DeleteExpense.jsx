import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-center">
          Are you sure you want to delete this expense?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

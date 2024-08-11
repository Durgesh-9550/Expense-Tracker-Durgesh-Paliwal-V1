import React from "react";
import axiosInstance from "../../apis/axiosInstance";

const DeleteProfileModal = ({ closeModal }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete("/delete_user");
      // Handle successful deletion (e.g., redirect to a different page)
      closeModal();
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Delete Profile</h2>
        <p className="mb-4">
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfileModal;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosInstance";

const EditModal = ({ isOpen, onClose, expense = {}, onSubmit }) => {
  const [localExpense, setLocalExpense] = useState(expense);

  useEffect(() => {
    setLocalExpense(expense || {});
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (localExpense._id) {
        await axiosInstance.put(`/expenses/${localExpense._id}`, localExpense);
        onSubmit(localExpense);
        onClose();
      }
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm pt-52">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-2xl font-bold mb-6">Edit Expense</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={localExpense.category || ''}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={localExpense.amount || ''}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={localExpense.description || ''}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full h-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={localExpense.date || ''}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

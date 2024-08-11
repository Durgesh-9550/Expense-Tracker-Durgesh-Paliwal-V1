import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import EditModal from "../Components/modal/EditExpense";
import DeleteModal from "../Components/modal/DeleteExpense";
import toast, { Toaster } from "react-hot-toast";

const AllExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/get_all_expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const expenses = await Promise.all(
          res.data.data.map(async ({ _id }) => {
            const expenseRes = await axiosInstance.get(`/get_expenses/${_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return expenseRes.data.data;
          })
        );
        setExpenses(expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to fetch expenses. Please try again.");
      }
    };

    fetchExpenses();
  }, []);

  const handleEdit = (expense) => {
    setCurrentExpense(expense); // Ensure currentExpense is at least an empty object
    setShowEditModal(true);
  };

  const handleDelete = (expense) => {
    setCurrentExpense(expense);
    setShowConfirmationModal(true);
  };

  const handleDeleteSelected = async () => {
    try {
      await axiosInstance.delete("/delete_multiple_expenses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { ids: selectedExpenses },
      });
      setExpenses(
        expenses.filter((exp) => !selectedExpenses.includes(exp._id))
      );
      setSelectedExpenses([]);
      toast.success("Selected expenses deleted successfully!");
    } catch (error) {
      console.error("Error deleting selected expenses:", error);
      toast.error("Failed to delete selected expenses. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/delete_expense/${currentExpense._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(expenses.filter((exp) => exp._id !== currentExpense._id));
      setShowConfirmationModal(false);
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log("Token from localStorage:", token);
  // }, []);

  const handleEditSubmit = async (updatedExpense) => {
    console.log("handleEditSubmit function called");

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        throw new Error("Token is missing from localStorage");
      }

      const res = await axiosInstance.put(
        `/expenses/${updatedExpense._id}`,
        updatedExpense,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response:", res.data);

      setExpenses(
        expenses.map((exp) =>
          exp._id === updatedExpense._id ? res.data.data : exp
        )
      );
      setShowEditModal(false);
      toast.success("Expense updated successfully!");
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense. Please try again.");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedExpenses((prevState) =>
      prevState.includes(id)
        ? prevState.filter((expId) => expId !== id)
        : [...prevState, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] flex flex-col items-center py-8 pt-24">
      <div className="w-full h-full max-w-6xl bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 mx-4 sm:mx-8">
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 cursor-default"
            onClick={handleDeleteSelected}
            disabled={selectedExpenses.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Select</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">S.No.</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Edit</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedExpenses.includes(expense._id)}
                    onChange={() => handleCheckboxChange(expense._id)}
                    className="accent-blue-500"
                  />
                </td>
                <td className="border px-4 py-2">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2">
                  ₹{expense.amount.toLocaleString("en-IN")}
                </td>
                <td className="border px-4 py-2">{expense.description}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
                    onClick={() => handleDelete(expense)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        <EditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          expense={currentExpense}
          onSubmit={handleEditSubmit}
        />

        {/* Confirmation Modal */}
        <DeleteModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default AllExpensesPage;

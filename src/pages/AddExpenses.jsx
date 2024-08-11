import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../apis/axiosInstance'

const AddExpense = () => {
  const [formData, setFormData] = useState([
    {
      amount: '',
      category: '',
      date: '',
      description: '',
    },
  ]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);
  };

  const handleAddExpense = () => {
    setFormData([
      ...formData,
      {
        amount: '',
        category: '',
        date: '',
        description: '',
      },
    ]);
  };

  const handleRemoveLastExpense = () => {
    if (formData.length > 1) {
      setFormData(formData.slice(0, -1));
    } else {
      toast.error("At least one expense must be present.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axiosInstance.post('/create_new_expense', { expenses: formData }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Expenses added successfully!");
      navigate('/dashboard'); // Redirect to Dashboard or another page upon success
    } catch (err) {
      toast.error("Failed to add expenses. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] flex items-center justify-center py-8 pt-24">
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4 sm:mx-8">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Add Expense</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.map((expense, index) => (
            <div key={index} className="space-y-4">
              <div className="mb-4">
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-800 placeholder-gray-500"
                  required
                  min="0"
                  placeholder="Enter amount"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="category"
                  value={expense.category}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-800 placeholder-gray-500"
                  required
                  placeholder="Enter category"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  name="date"
                  value={expense.date}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-800 placeholder-gray-500"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="description"
                  value={expense.description}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-800 placeholder-gray-500"
                  rows="4"
                  placeholder="Enter description"
                ></textarea>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddExpense}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 w-full mr-2"
            >
              Add Another Expense
            </button>
            <button
              type="button"
              onClick={handleRemoveLastExpense}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-300 w-full ml-2"
            >
              Remove Last Expense
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 w-full mt-6"
          >
            Submit Expenses
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;

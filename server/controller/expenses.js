const Expense = require("../models/Expense");
const { validationResult } = require("express-validator");

// new api/controller for creating single and multiple expenses together
// controllers/expenseController.js

const User = require("../models/User");

exports.createNewExpense = async (req, res) => {
  const { expenses } = req.body;

  if (!Array.isArray(expenses)) {
    return res.status(400).json({ error: "Expenses should be an array." });
  }

  try {
    const userId = req.user.id;

    // Insert new expenses into the Expense collection
    const newExpenses = await Expense.insertMany(expenses);

    // Extract the IDs of the newly created expenses
    const expenseIds = newExpenses.map((exp) => exp._id);

    // Update user's expenses array with the correct expense IDs
    const user = await User.findById(userId);
    if (user) {
      user.expenses.push(...expenseIds);
      await user.save();
    }

    // Respond with the newly created expenses
    res.status(201).json({
      success: true,
      data: newExpenses,
      message: "Expense(s) Created Successfully",
    });
  } catch (err) {
    console.error(err.message);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to Create Expense(s)",
        error: err.message,
      });
    }
  }
};

// Create new expense
// exports.createExpense = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { amount, category, date, description } = req.body;

//   try {
//     const newExpense = new Expense({
//       user: req.user.id,
//       amount,
//       category,
//       date,
//       description,
//     });

//     const expense = await newExpense.save();

//     res.status(201).json({
//       success: true,
//       data: expense,
//       message: "Single Expense Created Successfully",
//     });
//   } catch (err) {
//     console.error(err.message);

//     if (!res.headersSent) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to create Single Expense",
//         error: err.message,
//       });
//     }
//   }
// }

// get expese by id
// Controller function to get an expense by its ID
exports.getExpenseById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Expense ID is required.",
    });
  }

  try {
    // Fetch the expense by ID
    const expense = await Expense.findById(id);

    // Check if the expense was found
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Get all user's expenses
exports.getAllExpenses = async (req, res) => {
  try {
    // Find the user by ID and populate the expenses array
    const user = await User.findById(req.user.id).populate("expenses");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const expenses = user.expenses;

    res.status(200).json({
      success: true,
      data: expenses,
      message: "Fetched all Expenses Successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Expenses",
      error: err.message,
    });
  }
};

// edit expense
exports.editExpense = async (req, res) => {
  const { id } = req.params;
  const { category, amount, description } = req.body;

  try {
    // Find the expense by ID
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Update the expense fields
    if (category !== undefined) expense.category = category;
    if (amount !== undefined) expense.amount = amount;
    if (description !== undefined) expense.description = description;

    await expense.save();

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Single expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the expense from the expenses collection
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Remove the expense ID from the user's expenses array
    await User.updateMany(
      { "expenses._id": id },
      { $pull: { expenses: { _id: id } } }
    );

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Multiple expenses

exports.deleteMultipleExpenses = async (req, res) => {
  const { ids } = req.body;

  try {
    // Validate ids
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided",
      });
    }

    // Find expenses to delete
    const expenses = await Expense.find({ _id: { $in: ids } });
    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for the provided IDs",
      });
    }

    // Delete expenses
    await Expense.deleteMany({ _id: { $in: ids } });

    // Remove the expense IDs from all users
    await User.updateMany(
      { "expenses._id": { $in: ids } },
      { $pull: { expenses: { _id: { $in: ids } } } }
    );

    res.json({
      success: true,
      message: "Selected expenses deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting multiple expenses:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

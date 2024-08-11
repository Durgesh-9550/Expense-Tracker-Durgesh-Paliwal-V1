const express = require("express");
const router = express.Router();

// import authentication middleware
const auth = require("../middleware/auth");

// authentication/login route
const { loginUser } = require("../controller/auth");

// register user route
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

// expenses route
const {
  createNewExpense,
  getAllExpenses,
  deleteExpense,
  deleteMultipleExpenses,
  getExpenseById,
  editExpense,
} = require("../controller/expenses");

// importing check from express-validator -> to form middleware check for data
const { check } = require("express-validator");

// Auth routes
router.post(
  "/api/auth",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// User routes
router.post(
  "/api/users",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("income", "Income must be a number").optional().isNumeric(),
  ],
  registerUser
);

// get user
router.get("/api/get_user", auth, getUser);

// Update user route
router.put("/api/update_user", auth, updateUser);

// Delete user route
router.delete("/api/delete_user", auth, deleteUser);

// Expense routes
router.post(
  "/api/create_new_expense",
  [
    auth,
    [
      check("amount", "Amount is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  createNewExpense
);

// Route to get an expense by its ID
router.get("/api/get_expenses/:id", auth, getExpenseById);
router.get("/api/get_all_expenses", auth, getAllExpenses);

// edit expense
router.put("/api/expenses/:id", auth, editExpense);

// DELETE /api/expenses/:id
router.delete("/api/delete_expense/:id", auth, deleteExpense);

// DELETE /api/expenses/delete_multiple
router.delete("/api/delete_multiple_expenses", auth, deleteMultipleExpenses);

module.exports = router;

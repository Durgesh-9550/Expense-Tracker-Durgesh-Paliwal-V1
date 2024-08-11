const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String, // URL to the profile picture
    default: "", // Optional field
  },
  phoneNumber: {
    type: String,
    default: "", // Optional field
  },
  address: {
    type: String,
    default: "", // Optional field
  },
  dob: {
    type: Date,
    default: null, // Optional field
  },
  occupation: {
    type: String,
    default: "", // Optional field
  },
  about: {
    type: String,
    default: "", // Optional field
  },
  expenses: [
    {
      expenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
      },
      amount: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);

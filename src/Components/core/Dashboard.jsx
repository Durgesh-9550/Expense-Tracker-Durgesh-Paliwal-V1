import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  faRupeeSign,
  faMoneyBillWave,
  faWallet,
  faPlus,
  faList,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../apis/axiosInstance";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(0);
  const [name, setName] = useState("");
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [lowBudgetWarning, setLowBudgetWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch all expense IDs
        const idsRes = await axiosInstace.get("/get_all_expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const expenseIds = idsRes.data.data.map((expense) => expense._id);

        // Fetch all expenses using the IDs
        const expensePromises = expenseIds.map((id) =>
          axiosInstace.get(`/get_expenses/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const expensesRes = await Promise.all(expensePromises);
        const fetchedExpenses = expensesRes.map((res) => res.data.data);
        setExpenses(fetchedExpenses);

        // Fetch user data
        const userRes = await axiosInstace.get("/get_user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userRes.data.data;
        setName(userData.name || "User");
        setIncome(userData.income || 0);

        const totalExpenses = fetchedExpenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        const remainingBudget = userData.income - totalExpenses || 0;
        setBudget(remainingBudget);

        // Check if remaining budget is less than 10% of income
        setLowBudgetWarning(remainingBudget < 0.1 * userData.income);

        // Calculate monthly expenses
        const monthlyExpenses = fetchedExpenses.reduce((acc, expense) => {
          const date = new Date(expense.date);
          const month = date.getMonth();
          acc[month] = (acc[month] || 0) + expense.amount;
          return acc;
        }, {});

        setMonthlyExpenses(monthlyExpenses);

        // Calculate daily expenses for the selected month
        const updateDailyExpenses = (month) => {
          const today = new Date();
          const currentYear = today.getFullYear();
          const days = new Date(currentYear, month + 1, 0).getDate();
          setDaysInMonth(days);

          const dailyExpenses = fetchedExpenses.reduce((acc, expense) => {
            const date = new Date(expense.date);
            if (date.getMonth() === month && date.getFullYear() === currentYear) {
              const day = date.getDate();
              acc[day] = (acc[day] || 0) + expense.amount;
            }
            return acc;
          }, {});

          setDailyExpenses(dailyExpenses);
        };

        updateDailyExpenses(selectedMonth);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  // Data for the pie chart
  const expenseCategories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(expenseCategories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#F67019",
          "#F53794",
          "#537BC4",
          "#ACC236",
          "#166A8F",
          "#00A950",
          "#58595B",
          "#8549BA",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Data for the bar chart - Monthly Expenses
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: months.map((month) => monthlyExpenses[months.indexOf(month)] || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the histogram - Daily Expenses
  const histogramData = {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [
      {
        label: "Daily Expenses",
        data: Array.from({ length: daysInMonth }, (_, i) => dailyExpenses[i + 1] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)]">
      {/* Sidebar */}
      <div className="w-56 fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col p-4 pt-24">
        <button
          onClick={() => navigate("/addexpenses")}
          className="mb-4 p-2 bg-blue-600 hover:bg-blue-500 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Expense
        </button>
        <button
          onClick={() => navigate("/allexpenses")}
          className="mb-4 p-2 bg-blue-600 hover:bg-blue-500 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faList} className="mr-2" />
          All Expenses
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="mb-4 p-2 bg-blue-600 hover:bg-blue-500 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Profile
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-auto p-2 bg-red-600 hover:bg-red-500 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 pt-24 ml-56">
        <h2 className="text-5xl font-bold text-white mb-10">Hi {name} 👋</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-10">
          {/* Total Income */}
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 flex items-center">
            <div className="p-4 bg-green-500 bg-opacity-25 rounded-full">
              <FontAwesomeIcon
                icon={faRupeeSign}
                className="text-3xl text-green-700"
              />
            </div>
            <div className="ml-4">
              <p className="text-lg text-white">Total Income</p>
              <p className="text-2xl font-semibold text-white">
                ₹{income.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 flex items-center">
            <div className="p-4 bg-red-500 bg-opacity-25 rounded-full">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-3xl text-red-700"
              />
            </div>
            <div className="ml-4">
              <p className="text-lg text-white">Total Expenses</p>
              <p className="text-2xl font-semibold text-white">
                ₹{expenses.reduce((acc, expense) => acc + expense.amount, 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Remaining Budget */}
          <div
            className={`bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 flex items-center ${
              lowBudgetWarning ? "bg-red-100" : ""
            }`}
          >
            <div
              className={`p-4 ${
                lowBudgetWarning ? "bg-red-500" : "bg-blue-500"
              } bg-opacity-25 rounded-full`}
            >
              <FontAwesomeIcon
                icon={faWallet}
                className={`text-3xl ${
                  lowBudgetWarning ? "text-red-700" : "text-blue-700"
                }`}
              />
            </div>
            <div className="ml-4">
              <p className="text-lg text-white">Remaining Budget</p>
              <p className="text-2xl font-semibold text-white">
                ₹{budget.toLocaleString("en-IN")}
              </p>
              {lowBudgetWarning && (
                <p className="text-lg font-semibold text-red-600 mt-2">Low Budget</p>
              )}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Pie Chart */}
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 flex-1">
            <h3 className="text-2xl font-semibold text-white mb-4">Expenses by Category</h3>
            <Pie data={pieData} />
          </div>

          {/* Bar Chart - Monthly Expenses */}
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 flex-1">
            <h3 className="text-2xl font-semibold text-white mb-4">Monthly Expenses</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* Histogram - Daily Expenses */}
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mt-10">
          <div className="flex items-center mb-4">
            <h3 className="text-2xl font-semibold text-white flex-1">Daily Expenses</h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              className="bg-gray-700 text-white rounded p-2"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <Bar data={histogramData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

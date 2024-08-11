import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
// import Navbar from "./Components/common/Navbar";
// import Register from "./Components/auth/Register";
// import Login from "./Components/auth/Login";
// import Dashboard from "./Components/core/Dashboard";
// import Home from "./pages/Home";

// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import AddExpense from "./pages/AddExpenses";
// import AllExpensesPage from "./pages/AllExpensesPage";
// import Profile from "./pages/Profile";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./Components/auth/Login"));
const Register = lazy(() => import("./Components/auth/Register"));
const Dashboard = lazy(() => import("./Components/core/Dashboard"));
const AddExpense = lazy(() => import("./pages/AddExpenses"));
const AllExpensesPage = lazy(() => import("./pages/AllExpensesPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Navbar = lazy(() => import("./Components/common/Navbar"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addexpenses" element={<AddExpense />} />
            <Route path="/allexpenses" element={<AllExpensesPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;

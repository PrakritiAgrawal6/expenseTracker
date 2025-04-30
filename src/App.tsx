import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";

import "./index.css";
import Loader from "./components/Loader";
import QuestionAnswerPage from "./components/questions";
import TransactionsPage from "./components/Transactions";

const Header = React.lazy(() => import("./components/Header"));
const Login = React.lazy(() => import("./components/Login"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const Register = React.lazy(() => import("./components/Register"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const ProtectedRoute = React.lazy(() => import("./auth/ProtectedRoute"));

const App: React.FC = () => {
  return (
    <Box className="flex w-full h-full flex-col">
      <ToastContainer position="top-right" autoClose={5000} />
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/questions" element={<QuestionAnswerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Box>
  );
};

export default App;
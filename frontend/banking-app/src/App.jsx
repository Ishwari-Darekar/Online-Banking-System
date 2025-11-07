import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Chatboot from "./pages/chatboot";
import Notification from "./pages/notification";
import Card from "./pages/card";
import Customer from "./pages/emp"; // Employee panel
import SendMoney from "./pages/SendMoney";
import PayBills from "./pages/PayBills";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Customer Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex w-full min-h-screen">
                <Sidebar /> {/* Sidebar only shows when logged in */}
                <div className="flex-1 flex items-center justify-center">
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/card"
          element={
            <ProtectedRoute>
              <div className="flex w-full min-h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                  <Card />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatboot"
          element={
            <ProtectedRoute>
              <div className="flex w-full min-h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                  <Chatboot />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <div className="flex w-full min-h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                  <Notification />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/SendMoney"
          element={
            <ProtectedRoute>
              <div className="flex w-full min-h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                  <SendMoney />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/PayBills"
          element={
            <ProtectedRoute>
              <div className="flex w-full min-h-screen">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                  <PayBills />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Employee Route (not protected) */}
        <Route path="/emp" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;

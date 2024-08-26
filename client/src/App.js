import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRouter from "./AdminRouter.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Customer from "./pages/Customer/Customer.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login and Signup routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminRouter />
            </PrivateRoute>
          }
        />
        {/* Customer Routes */}
        
          <Route
            path="/customer"
            element={
              <PrivateRoute>
                <Customer />
              </PrivateRoute>
            }
          />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Homepage/Home";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Registerpage/Register";
import Admin from "./Pages/AdminPage/Admin";
import React from "react";
import Otp from "./Pages/OTPpage/Otp";
import EmailLogin from "./Pages/EmailLogin/EmailLogin";
import "react-toastify/dist/ReactToastify.css";
import PhoneVerification from "./Pages/PhoneVerification/PhoneVerification";
import Verification from "./Pages/EmailVerificationPage/Verification";

const ProtectedRoute = ({ element, roles }) => {
  const user = JSON.parse(sessionStorage.getItem("Existinguser"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/home" />;
  }

  return element;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path='/emaillogin' element={<EmailLogin></EmailLogin>}></Route> */}

        <Route
          path="/home"
          element={<ProtectedRoute roles={["User"]} element={<Home></Home>} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute roles={["admin"]} element={<Admin />} />}
        />
        <Route path="emailVerification" element={<Verification />} />
        <Route
          path="phoneVerification"
          element={<PhoneVerification></PhoneVerification>}
        ></Route>
        <Route path="/user/otp" element={<Otp></Otp>}></Route>
      </Routes>
    </div>
  );
}

export default App;

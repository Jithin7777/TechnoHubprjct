// import React, { useState } from "react";
// import { Button, NavLink } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import { sendOtp } from "../../Service/allApi";
// const EmailLogin = () => {
//   const [email, setEmail] = useState("");
//   console.log(email);

//   //sendOTP

//   const sendemailOTP = async(e) => {
//     e.preventDefault();
//     if (email === "") {
//       toast.error("Enter Your Email");
//     } else if (!email.includes("@")) {
//       toast.error("Enter valid email");
//     } else {
//       const data={
//         email:email
//       }
//       const response=await sendOtp(data);
//       console.log(response);
//     }
//   };

//   return (
//     <div>
//       <div className="form_data">
//         <div className="form-heading">
//           <h1>Welcome Back</h1>
//           <h1>Enter you email for verification</h1>
//         </div>
//       </div>
//       <form>
//         <div className="form-input">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             name="email"
//             id=""
//             placeholder="Enter your email address"
//           />
//         </div>
//         <Button type="submit" className="" onClick={sendemailOTP}>
//           Login
//         </Button>
//         <p className="mt-5 ms-5">
//           If you don't have an account, you can{" "}
//           <a href="/" style={{ textDecoration: "none", color: "#4D47C3" }}>
//             register here!
//           </a>
//           .
//         </p>{" "}
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default EmailLogin;

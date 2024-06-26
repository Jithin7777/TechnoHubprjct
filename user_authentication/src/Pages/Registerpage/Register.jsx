

import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { assets } from "../../images/assets";
import "./Register.css";
import { generateOtpAPI, registerApi } from "../../Service/allApi";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const setInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = user;
    if (!username || !email || !password || !confirmPassword) {
      alert("please fill all fields");
    } else {
      const result = await registerApi(user);
      if (result.status === 200) {
        alert(`${result.data.username} your account created successfully`);
        // navigate('/login');
        await generateOtp(email);
        // Reset the form fields
        setUser({
          userName: "",
          email: "",
          password: "",
          // phone: "",
        });
        navigate("/emailVerification");
        sessionStorage.setItem("email", JSON.stringify(email));
} else {
        alert(result.response.data);
      }
    }
  };

 const generateOtp=async(email)=>{
  try {
    const result=await generateOtpAPI({email})
    if(result.status === 200){
      alert('OTP Generated Successfully')
    }
  } catch (error) {
    console.log(error);
  }
 }



  // const onSuccess = async (tokenResponse) => {
  //   console.log(tokenResponse);
  //   navigate('/home');
  // };

  // const login = useGoogleLogin({
  //   onSuccess,
  // });

  const onSuccess = async (tokenResponse) => {
    try {
      const googleUser = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, 
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: 'application/json'
          }
        }
      );

      const userData = {
        username: googleUser.data.name,
        email: googleUser.data.email,
        image: googleUser.data.picture, 
        role: "User"
      };

      sessionStorage.setItem("Existinguser", JSON.stringify(userData));
      navigate('/home');
    } catch (error) {
      console.error("Google login error:", error);
      alert("An error occurred during Google login. Please try again.");
    }
  };

  const register = useGoogleLogin({
    onSuccess,
    onFailure: (error) => console.error("Google login failure:", error)
  });


  return (
    <div>
      <Container>
        <Header />
        <Row className="justify-content-md-center">
          <Col className="p-5">
            <h4 className="text-center">Signup</h4>
            <div className="ms-5 me-5">
              <FloatingLabel
                controlId="floatingInputEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  style={{ backgroundColor: "#F0EFFF" }}
                  type="email"
                  placeholder="name@example.com"
                  onChange={setInputs}
                  name="email"
                  value={user.email}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingUsername"
                label="Create Username"
                className="mb-3"
                style={{ backgroundColor: "#F0EFFF" }}
              >
                <Form.Control
                  style={{ backgroundColor: "#F0EFFF" }}
                  type="text"
                  placeholder="Username"
                  onChange={setInputs}
                  name="username"
                  value={user.username}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  style={{ backgroundColor: "#F0EFFF" }}
                  type="password"
                  placeholder="Password"
                  onChange={setInputs}
                  name="password"
                  value={user.password}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  style={{ backgroundColor: "#F0EFFF" }}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={setInputs}
                  name="confirmPassword"
                  value={user.confirmPassword}
                />
              </FloatingLabel>

              <Button
                onClick={handleRegister}
                type="submit"
                className="w-100 mt-3 custom-button"
                style={{ backgroundColor: "#4D47C3" }}
                size="lg"
              >
                Register
              </Button>
              <p className="text-center mt-5 mx-auto">or continue with</p>
              <div className="text-center ">
                <img className="me-3" src={assets.facebook} alt="Facebook" />
                <img className="me-3" src={assets.apple} alt="Apple" />
                {/* <img onClick={() => login()} className="me-3" src={assets.google} alt="Google" /> */}
                <img onClick={() => register()} className="me-3" src={assets.google} alt="Google" />

              </div>
            </div>
          </Col>

          <Col lg={3}>
            <p className="fw-bold ms-5 heading" style={{ marginTop: '100px' }}>Sign Up to</p>
            <h4 className="ms-5" style={{ fontSize: '35px' }}>Lorem ipsum is simply</h4>
            <p className="mt-5 ms-5">
              If you already have an account, <br />
              you can{" "}
              <a href="/login" style={{ textDecoration: "none", color: '#4D47C3' }}>
                login here!
              </a>
              .
            </p>
          </Col>
          <Col lg={2} sm={2}>
            <img
              className="text-center"
              src={assets.user_icon}
              style={{
                height: "556px",
                marginTop: "110px",
              }}
              alt="User Icon"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;



// import React, { useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Form from "react-bootstrap/Form";
// import { assets } from "../../images/assets";
// import "./Register.css";
// import { registerApi } from "../../Service/allApi";
// import Header from "../../Components/Header";
// import { useNavigate } from "react-router-dom";
// import { useGoogleLogin } from '@react-oauth/google';

// const Register = () => {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "User", // Default role
//   });

//   const navigate = useNavigate();

//   const setInputs = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };
//   console.log(user);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const { username, email, password, confirmPassword, role } = user;
//     if (!username || !email || !password || !confirmPassword || !role) {
//       alert("Please fill all fields");
//     } else {
//       const result = await registerApi(user);
//       if (result.status === 200) {
//         alert(`${result.data.username} your account created successfully`);
//         if (role === 'Admin') {
//           navigate('/admin'); // Redirect to admin page if role is Admin
//         } else {
//           navigate('/login'); // Redirect to login page for other roles
//         }
//       } else {
//         alert(result.response.data);
//       }
//     }
//   };
  
//   const onSuccess = async (tokenResponse) => {
//     console.log(tokenResponse);
//     navigate('/home');
//   };

//   const login = useGoogleLogin({
//     onSuccess,
//   });

//   return (
//     <div>
//       <Container>
//         <Header />
//         <Row className="justify-content-md-center">
//           <Col className="p-5">
//             <h4 className="text-center">Signup</h4>
//             <div className="ms-5 me-5">
//               <FloatingLabel
//                 controlId="floatingInputEmail"
//                 label="Email address"
//                 className="mb-3"
//               >
//                 <Form.Control
//                   style={{ backgroundColor: "#F0EFFF" }}
//                   type="email"
//                   placeholder="name@example.com"
//                   onChange={setInputs}
//                   name="email"
//                   value={user.email}
//                 />
//               </FloatingLabel>

//               <FloatingLabel
//                 controlId="floatingUsername"
//                 label="Create Username"
//                 className="mb-3"
//                 style={{ backgroundColor: "#F0EFFF" }}
//               >
//                 <Form.Control
//                   style={{ backgroundColor: "#F0EFFF" }}
//                   type="text"
//                   placeholder="Username"
//                   onChange={setInputs}
//                   name="username"
//                   value={user.username}
//                 />
//               </FloatingLabel>
//               <FloatingLabel
//                 controlId="floatingPassword"
//                 label="Password"
//                 className="mb-3"
//               >
//                 <Form.Control
//                   style={{ backgroundColor: "#F0EFFF" }}
//                   type="password"
//                   placeholder="Password"
//                   onChange={setInputs}
//                   name="password"
//                   value={user.password}
//                 />
//               </FloatingLabel>
//               <FloatingLabel
//                 controlId="floatingConfirmPassword"
//                 label="Confirm Password"
//                 className="mb-3"
//               >
//                 <Form.Control
//                   style={{ backgroundColor: "#F0EFFF" }}
//                   type="password"
//                   placeholder="Confirm Password"
//                   onChange={setInputs}
//                   name="confirmPassword"
//                   value={user.confirmPassword}
//                 />
//               </FloatingLabel>

//               <FloatingLabel controlId="floatingRole" label="Role" className="mb-3">
//                 <Form.Select
//                   style={{ backgroundColor: "#F0EFFF" }}
//                   onChange={setInputs}
//                   name="role"
//                   value={user.role}
//                 >
//                   <option value="User">User</option>
//                   <option value="Admin">Admin</option>
//                 </Form.Select>
//               </FloatingLabel>

//               <Button
//                 onClick={handleRegister}
//                 type="submit"
//                 className="w-100 mt-3 custom-button"
//                 style={{ backgroundColor: "#4D47C3" }}
//                 size="lg"
//               >
//                 Register
//               </Button>
//               <p className="text-center mt-5 mx-auto">or continue with</p>
//               <div className="text-center ">
//                 <img className="me-3" src={assets.facebook} alt="Facebook" />
//                 <img className="me-3" src={assets.apple} alt="Apple" />
//                 <img onClick={() => login()} className="me-3" src={assets.google} alt="Google" />
//               </div>
//             </div>
//           </Col>

//           <Col lg={3}>
//             <p className="fw-bold ms-5 heading" style={{ marginTop: '100px' }}>Sign Up to</p>
//             <h4 className="ms-5" style={{ fontSize: '35px' }}>Lorem ipsum is simply</h4>
//             <p className="mt-5 ms-5">
//               If you already have an account, <br />
//               you can{" "}
//               <a href="/login" style={{ textDecoration: "none", color: '#4D47C3' }}>
//                 login here!
//               </a>
//               .
//             </p>
//           </Col>
//           <Col lg={2} sm={2}>
//             <img
//               className="text-center"
//               src={assets.user_icon}
//               style={{
//                 height: "556px",
//                 marginTop: "110px",
//               }}
//               alt="User Icon"
//             />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Register;







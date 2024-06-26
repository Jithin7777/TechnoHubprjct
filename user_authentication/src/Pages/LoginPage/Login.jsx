import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { assets } from "../../images/assets";
import { loginApi } from "../../Service/allApi";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

const Login = () => {
  const [userlogin, setUserlogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const setInputs = (e) => {
    const { name, value } = e.target;
    setUserlogin({ ...userlogin, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userlogin;
    if (!email || !password) {
      alert("Please fill all fields");
    } else {
      try {
        const result = await loginApi(userlogin);
        console.log("API response:", result);

        if (result.status === 200) {
          sessionStorage.setItem("Existinguser", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          const username = result.data.user.username || "User";

          alert(`${username}, you have logged in successfully`);
          setUserlogin({ email: "", password: "" });
          navigate("/home");
        } else {
          alert(result.response.data);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    }
  };

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

  const login = useGoogleLogin({
    onSuccess,
    onFailure: (error) => console.error("Google login failure:", error)
  });

  return (
    <div>
      <Container>
        <Header />

        <Row className="mt-5">
          <Col lg={4}>
            <p className="fw-bold ms-5 mt-5 heading">Sign in to</p>
            <h4 className="ms-5" style={{ fontSize: "35px" }}>
              Lorem ipsum is simply
            </h4>
            <p className="mt-5 ms-5">
              If you don't have an account, you can{" "}
              <a href="/" style={{ textDecoration: "none", color: "#4D47C3" }}>
                register here!
              </a>
              .
            </p>
          </Col>
          <Col lg={2}>
            <img
              className="text-center"
              src={assets.user_icon}
              style={{ height: "400px", marginTop: "150px", marginLeft: '40px' }}
              alt="User Icon"
            />
          </Col>
          <Col lg={6} sm={6} xs={12} className="p-2">
            <h4 className="ms-5">Sign in</h4>
            <Form onSubmit={handleLogin} className="mt-5 ms-5 me-5">
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
                  
                  value={userlogin.email}
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
                  value={userlogin.password}
                />
              </FloatingLabel>
              <Button
                type="submit"
                className="w-100 mt-3 custom-button"
                style={{ backgroundColor: "#4D47C3" }}
                size="lg"
              >
                Login
              </Button>
              <p className="text-center mt-5 mx-auto">or continue with</p>
              <div className="text-center">
                <img className="me-3" src={assets.facebook} alt="Facebook" />
                <img className="me-3" src={assets.apple} alt="Apple" />

                <img onClick={() => login()} className="me-3" src={assets.google} alt="Google" />

{/*                   <img onClick={loginwithgoogle} className="me-3" src={assets.google} alt="Google" /> */}
                  {/* onClick={()=>login()} */}





              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

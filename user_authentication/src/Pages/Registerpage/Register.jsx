import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { assets } from "../../images/assets";
import "./Register.css";
import {registerApi } from "../../Service/allApi";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {

  //state to store inputs
  const [user,setUser]=useState({
  username: "", email: "", password: "", confirmPassword: "" ,googleId:"", })

  const navigate=useNavigate()

const setInputs=(e)=>{
const {name,value}=e.target
setUser({...user,[name]:value})
}
console.log(user);

const handleRegister=async(e)=>{
e.preventDefault()
const {username,email,password,confirmPassword,googleId}=user
if(!username || !email || !password || !confirmPassword ||!googleId){
  alert("please fill all datas")
}else{
const result=await registerApi(user)
if(result.status === 200){
  alert(`${result.data.username} your account created successfully`)
  navigate('/login')
}
else{
  alert(result.response.data)

}
}
}

const onSuccess = async (tokenResponse) => {
  console.log(tokenResponse);
  navigate('/home'); 
};

const login = useGoogleLogin({
  onSuccess,
});



  return (
    <div>
      <Container>
        <Header></Header>
        <Row className="justify-content-md-center">
          <Col className="p-5">
            <h4 className="text-center">Signup</h4>
            <div className=" ms-5  me-5">
              <FloatingLabel
                controlId="floatingInputEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  style={{ backgroundColor: "#F0EFFF" }}
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e)=>setInputs(e)}
                    name='email'
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
                  onChange={(e)=>setInputs(e)}
                    name='username'
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
                  onChange={(e)=>setInputs(e)}
                    name='password'
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
                  onChange={(e)=>setInputs(e)}
                    name='confirmPassword'
                    value={user.confirmPassword}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingGoogleId"
                label="Google ID"
                className="mb-3"
              >
                <Form.Control
                  style={{ backgroundColor: "#F0EFFF" }}
                  type="text"
                  placeholder="Google ID"
                  onChange={(e) => setInputs(e)}
                  name="googleId"
                  value={user.googleId}
                />
              </FloatingLabel>



              <Button
                onClick={(e)=>handleRegister(e)}
                type="submit"
                className="w-100 mt-3 custom-button"
                style={{ backgroundColor: "#4D47C3" }}
                size="lg"
              >
                Register
              </Button>
              <p className="text-center mt-5 mx-auto">or continue with</p>
              <div className="text-center ">
                <img className="me-3" src={assets.facebook} alt="" />
                <img  className="me-3" src={assets.apple} alt="" />
                <img onClick={()=>login()} className="me-3" src={assets.google} alt="" />
              </div>{" "}
            </div>
          </Col>

          <Col lg={3}>
            {" "}
            <p className="fw-bold ms-5 heading " style={{marginTop:'100px'}}>Sign Up to</p>
            <h4 className="ms-5" style={{fontSize:'35px'}}>Lorem ipsum is simply</h4>
            <p className="mt-5 ms-5">
              If you already have an account, <br />
              you can{" "}
              <a href="/login" style={{ textDecoration: "none",color:'#4D47C3' }}>
                login here!
              </a>
              .
            </p>
          </Col>
          <Col lg={2} sm={2}>
          <img
              className=" text-center"
              src={assets.user_icon}
              style={{
                height: "556px",               
                 marginTop: "110px",
              }}
              alt="User Icon"
            />{" "}

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;





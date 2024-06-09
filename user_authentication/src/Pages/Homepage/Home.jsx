import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Col, Row, Button } from "react-bootstrap";
import "./Homepage.css";
import Cards from "../../Components/Cards";
import HomeCarousal from "../../Components/HomeCarousal";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";

const Home = () => {
  // const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
      });
      console.log("response",response);
      setUserdata(response.data.user);
    } catch (error) {
      // console.log("error", error);
    }
  };

  const checkSessionStorage = () => {
    const storedUser = sessionStorage.getItem("Existinguser");
    if (storedUser) {
      setUserdata(JSON.parse(storedUser));
    }
  };
  

  useEffect(() => {
    getUser();
    checkSessionStorage();
  }, []);

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self");
    sessionStorage.removeItem("Existinguser");
    sessionStorage.removeItem("token");
    // navigate('/login'); 

  };

  // const logout = () => {
  //   sessionStorage.removeItem("Existinguser");
  //   sessionStorage.removeItem("token");
  //   navigate('/login'); 

  return (
    <div>
      <div style={{ backgroundColor: "#3E5D5E", minHeight: "100vh" }}>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand
              href="#home"
              className=" ms-3"
              style={{ color: "#77CF16" }}
            >
              <h3 className="fw-bold">D'watch</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto ">
                <div className="me-5 underline">
                  <Nav.Link href="#home" className="text-white">
                    Products
                  </Nav.Link>
                </div>
                <div className="me-5 underline">
                  <Nav.Link href="#features" className="text-white">
                    About
                  </Nav.Link>
                </div>
                <div className="me-5 underline">
                  <Nav.Link href="#pricing" className="text-white">
                    Contact
                  </Nav.Link>
                </div>
                <div className="me-5 underline">
                  <Nav.Link href="#pricing" className="">
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{ color: "#77CF16" }}
                    ></i>
                  </Nav.Link>
                </div>

                {Object?.keys(userdata)?.length > 0 ? (
                  <div className="d-flex align-items-center  me-5 ">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        className="me-1"
                        src={userdata.image}
                        alt=""
                        height="30px"
                        style={{ borderRadius: "30px" }}
                      />
                      <li className="text-white">{userdata.username}</li>
                    </div>
                    <div className="">
                      <Nav.Link className="text-white">
                        <Button
                          onClick={logout}
                          className="btn btn-danger pb-2 ms-4"
                        >
                          logout
                        </Button>
                      </Nav.Link>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}
              
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="mt-3 ">
          <Row>
            <Col lg={7} className="">
              <h1 className="home-heading ms-4 text-white">
                This is the time to <br /> transform yourself into a <br /> real
                man
              </h1>
              <p className=" ms-4 text-white mt-3">
                Hanpicked collection of{" "}
                <span style={{ color: "#77CF16" }}>premium</span> time keepers{" "}
                <br /> for all purpose and ages
              </p>
              <p className=" ms-4 text-white mt-4">Featured Collectibles</p>
              <Cards />
            </Col>

            <Col lg={5}>
              <HomeCarousal className=""></HomeCarousal>
            </Col>
          </Row>{" "}
          {/* Add more homepage content here */}
        </Container>
      </div>{" "}
    </div>
  );
};

export default Home;

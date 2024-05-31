import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assets } from "../images/assets";

const Cards = () => {
  return (
    <Row lg={3} xs={1} md={3} className="g-4 ms-2 me-4" >
       <Col lg={4} xs={6}>
       <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>         
        <Card.Img variant="top" className='mx-auto mt-4' src={assets.watch4} style={{ maxWidth: '41%', }}/>
          <Card.Body>
            <Card.Title className='text-center'>ROLEX</Card.Title>
           
            <p className="text-center">$169</p>
            <Button style={{ backgroundColor: '#77CF16', borderColor: '#77CF16' }} className='mx-auto d-block'>Buy Now</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} xs={6}>
      <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>         
          <Card.Img variant="top" className='mx-auto mt-4' src={assets.watch1} style={{ maxWidth: '30%', }}/>
          <Card.Body>
            <Card.Title className='text-center'>MINI FOCUS</Card.Title>
           
            <p className="text-center">$169</p>
            <Button style={{ backgroundColor: '#77CF16', borderColor: '#77CF16' }} className='mx-auto d-block'>Buy Now</Button>
          </Card.Body>
        </Card>
      </Col>      
      <Col lg={4}>
      <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>         
          <Card.Img variant="top" className='mx-auto mt-4' src={assets.watch3} style={{ maxWidth: '45%', }}/>
          <Card.Body>
            <Card.Title className='text-center'>MINI FOCUS</Card.Title>
           
            <p className="text-center">$169</p>
            <Button style={{ backgroundColor: '#77CF16', borderColor: '#77CF16' }} className='mx-auto d-block'>Buy Now</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;

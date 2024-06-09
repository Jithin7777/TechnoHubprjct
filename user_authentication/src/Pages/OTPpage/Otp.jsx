import React from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Otp = () => {
  return (
    <div className='w-50 mx-auto'>
        <div className="mt-5">
           <h1 className='text-center'>Please Enter Your OTP here</h1>

      <FloatingLabel controlId="floatingPassword" label="OTP">
        <Form.Control type="text" name='otp' id='' placeholder="Enter Your OTP" />
      </FloatingLabel>
<div className='text-center'> 
          <Button className='mt-5'>Submit</Button>
    
</div>      
  </div>
    </div>
  )
}

export default Otp
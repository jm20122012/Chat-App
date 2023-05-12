import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const WelcomeScreen = (props) => {
  return (
    <>
        <h3>Welcome to chat. Please enter user information.</h3>
            <div className="d-flex justify-content-center my-auto">
                <p className="my-auto" style={{marginRight: "5px"}}>Enter Username</p>
                <Form.Group>
                    <Form.Control type="text" onChange={(e) => props.setUserName(e.target.value)}/>
                </Form.Group>
                <Button variant="secondary" style={{marginLeft: "5px"}} onClick={() => props.handleSubmit()}>Join Chat</Button>
            </div>
    </>
  )
}

export default WelcomeScreen
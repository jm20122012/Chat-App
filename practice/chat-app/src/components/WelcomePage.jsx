import React from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const WelcomePage = (props) => {
  return (
    <>
        <Container fluid style={{border: "1px solid black", borderRadius: "5px"}}>
            <h2>Welcome to the super awesome chat app!</h2>
            <h4>Please fill out form below to enter chat</h4>
            <Form>
                <Form.Control 
                    className="mt-3" 
                    placeholder="Enter username"
                    onChange={(e) => props.setUserName(e.target.value)}></Form.Control>
                <Form.Control 
                    className="mt-3" 
                    placeholder="Enter room name"
                    onChange={(e) => props.setChatRoom(e.target.value)}></Form.Control>
                <Button 
                    className="m-3"
                    onClick={() => props.setUserJoined(true)}>Submit</Button>
            </Form>
        </Container>
    </>
  )
}

export default WelcomePage
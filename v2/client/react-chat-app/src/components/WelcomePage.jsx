import React, {useEffect, useState} from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const WelcomePage = (props) => {

  return (
    <Container fluid style={{border: "1px solid black", borderRadius: "5px"}}>
        <h1>Welcome to super awesome chat app!</h1>
        <h3>Please fill out form below to join chat</h3>
    <Form>
      <Form.Control style={{width: "30em"}} className="m-3 mx-auto" placeholder="Enter username"
        onChange={(e) => {
            props.setUserName(e.target.value);
        }}>
      </Form.Control>
      <Form.Control style={{width: "30em"}} className="m-3 mx-auto" placeholder="Enter room name"
        onChange={(e) => {
            props.setChatRoom(e.target.value);
        }}>
      </Form.Control>
      <Button 
        className="m-3" 
        variant="primary"
        onClick={() => {props.setUserJoined(true)}}>Submit</Button>
    </Form>
  </Container>
  )
}

export default WelcomePage
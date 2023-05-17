import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [ userName, setUserName ] = useState("");
  const [ userIsConnected, setUserIsConnected ] = useState(false);

  const handleSubmit = () => {
    setUserIsConnected(true);
  }

  return (
    <>
      <Container fluid>
          {
            userIsConnected ? <ChatWindow userName={userName} /> : <WelcomeScreen setUserName={setUserName} handleSubmit={handleSubmit}/> 
          }
      </Container>
    </>
  )
}

export default App

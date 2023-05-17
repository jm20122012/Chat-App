import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {io} from "socket.io-client";

const ChatWindow = (props) => {

    const [messageLog, setMessageLog ] = useState("");
    const [chatMessage, setChatMessage] = useState("");
    const [socket, setSocket] = useState(null);

    const handleSubmit = () => {
        // let newMessage = props.userName + ": " + chatMessage + "\n";
        // setMessageLog((prevMessages) => prevMessages + newMessage);
        // setChatMessage("");
        socket.emit("clientToServerMsg", {userName: props.userName, msg: chatMessage});
        setChatMessage("");
    }

    const handleServerMessage = (message) => {
        console.log("Recieved message from server: ", message);
        let newMessage = messageLog + `${message.userName}: ${message.msg}\n`
        setMessageLog((prevMsg) => prevMsg + newMessage);
    }

    useEffect(() => {
        console.log("Connecting to server...");

        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        
        newSocket.on("connect", () => {
            console.log("Connected to server.")
        })

        newSocket.on("serverToClientMsg", (message) => {
            handleServerMessage(message);
        })

    }, [])

    return (
        <>
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>Welcome to chat!</Form.Label>
                        <Form.Control as="textarea" rows={10} value={messageLog}/>
                        <div className="d-flex m-3">
                            <Form.Label>Enter Message:</Form.Label>
                            <Form.Control type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}></Form.Control>
                            <Button variant="primary" onClick={(e) => {handleSubmit(e)}}>Send</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default ChatWindow
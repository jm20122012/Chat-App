import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {io} from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

const ChatPage = (props) => {

    const [chatLog, setChatLog] = useState("");
    const [chatMsg, setChatMsg] = useState("");
    const [websocketClient, setWebSocketClient] = useState(null);

    const handleSendMessage = () => {
        console.log("Sending message", chatMsg);

        // Send the message to the websocket server
        websocketClient.emit("message", chatMsg);
        setChatMsg("");
    }

    useEffect(() => {
        console.log("Connecting to server...");
        const client = io(SERVER_URL);

        client.on("connect", () => {
            console.log("Connected to server");
            setWebSocketClient(client);
            client.emit("join", props.chatRoom);
            client.emit("userName", props.userName);
        })

        client.on("message", (message) => {
            console.log("Received message from server: ", message);
            setChatLog((prevLog) => {
                return prevLog + message + "\n";
            })
        })

        return () => {
            if (client.connected) {
                console.log("Closing server connection due to component unmount");
                client.disconnect()
            }
        }
    }, []);

    return (
        <>
            <Container fluid style={{border: "1px solid black", borderRadius: "5px", width: "800px", height: "600px"}}>
                <h3>You are in chat room: {props.chatRoom}</h3>
                <Form>
                    <Form.Control className="mt-3" value={chatLog} as="textarea" disabled rows={15}></Form.Control>
                    <Form.Control className="mt-3" value={chatMsg} placeholder="Enter chat message" onChange={(e) => {setChatMsg(e.target.value)}}></Form.Control>
                    <Button className="mt-3" onClick={() => handleSendMessage()}>Send Message</Button>
                </Form>
            </Container>
        </>
    )
}

export default ChatPage
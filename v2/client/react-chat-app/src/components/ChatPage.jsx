    import React, { useEffect, useState } from 'react'
    import Container from 'react-bootstrap/esm/Container';
    import Form from "react-bootstrap/Form";
    import Button from "react-bootstrap/Button";

    import {io} from "socket.io-client";

    const SERVER_URL = "http://localhost:3000";

    const ChatPage = (props) => {
        const [websocketClient, setWebsocketClient] = useState(null);
        const [chatMsg, setChatMsg] = useState("");
        const [pendingMsg, setPendingMsg] = useState("");
        
        useEffect(() => {
            // Connect to websocket server
            const c = io(SERVER_URL);

            c.on("connect", () => {
                console.log("Connected to server");
                c.emit("newClient", JSON.stringify(
                    {
                        userName: props.userName,
                        chatRoom: props.chatRoom,
                    }
                ))
                c.emit("join", props.chatRoom);
                setWebsocketClient(c);
            })

            c.on("disconnect", () => {
                console.log("Disconnected from server");
            })

            c.on("message", (message) => {
                console.log(`Received message from server: ${message}`)
                let newMsg = `${message}\n`;
                setChatMsg((prev) => {
                    return prev + newMsg;
                });
            })

            // Handle component unmount
            return () => {
                if (c.connected) {
                    console.log("Disconnecting due to component unmount");
                    c.disconnect()
                }
            }
        }, [])

    const handleSendMessage = () => {
        console.log(`Sending message: ${pendingMsg}`)
        websocketClient.emit("message", pendingMsg);
        setPendingMsg("");
    }

    const handleUserLeave = () => {
        console.log("User is leaving chatroom");
        websocketClient.emit("leave", props.chatRoom);
        props.setChatRoom("");
        props.setUserJoined(false);
    }

    return (
        <Container style={{border: "1px solid black", borderRadius: "5px",width: "800px"}}>
            <h2>You are in room: {props.chatRoom}</h2>
            <Form>
                <Form.Control readOnly as="textarea" value={chatMsg} rows={20}>

                </Form.Control>
            <Form.Control 
                className="mt-3"
                placeholder="Enter chat message" 
                value={pendingMsg} 
                onChange={(e) => {setPendingMsg(e.target.value)}}></Form.Control>
            </Form>
            <Container fluid>
                <Button className="m-3" variant="primary" onClick={() => handleSendMessage()}>Submit</Button>
                <Button className="m-3" variant="primary" onClick={() => handleUserLeave()}>Leave Room</Button>
            </Container>
        </Container>
    )
    }

    export default ChatPage
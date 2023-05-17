import { useState, useEffect } from 'react'

// Custom imports
import WelcomePage from './components/WelcomePage';
import ChatPage from './components/ChatPage';

// Styles
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    const [chatRoom, setChatRoom] = useState("");
    const [userName, setUserName] = useState("");
    const [userJoined, setUserJoined] = useState(false);

    useEffect(() => {
        console.log(`Username value: ${userName}`);
    }, [userName])


    useEffect(() => {
        console.log(`Chatroom value: ${chatRoom}`);
    }, [chatRoom])

    return (
        <>
        {
            userJoined 
            ? <ChatPage 
                userName={userName}
                chatRoom={chatRoom}
                setChatRoom={setChatRoom}
                setUserJoined={setUserJoined} /> 
            : <WelcomePage 
                userName={userName}
                setUserName={setUserName} 
                setChatRoom={setChatRoom} 
                setUserJoined={setUserJoined}/>
        }
        </>
    )
}

export default App

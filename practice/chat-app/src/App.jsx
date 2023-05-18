import { useState } from 'react'

import WelcomePage from "./components/WelcomePage.jsx";
import ChatPage from "./components/ChatPage.jsx";

// import bootstrap classes
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [userJoined, setUserJoined] = useState(false);

  return (
    <>
      {
        userJoined
          ? <ChatPage userName={userName} chatRoom={chatRoom} setUserJoined={setUserJoined}/>
          : <WelcomePage setUserName={setUserName} setChatRoom={setChatRoom} setUserJoined={setUserJoined}/> 
      }
    </>
  )
}

export default App

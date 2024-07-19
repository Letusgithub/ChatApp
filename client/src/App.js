import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>❤️CHAT-NEST ❤️</h1>
          <h3>"Cut the call—start chatting now!"</h3>
          <input type="text" placeholder="Type Name..." onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
          <input type="text" placeholder="Type Room Id..." onChange={(event) => {
            setRoom(event.target.value);
          }} />
          <button onClick={joinRoom}>Dive into the Chat Room</button>
        </div>
      )
        : (
          <Chat socket={socket} username={username} room={room} />
        )}
      <footer className='last-footer'>Made With ❤️ By Aditya Anand</footer>
    </div>
  );
}

export default App;

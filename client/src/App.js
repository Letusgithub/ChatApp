import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("https://chat-jmrw.onrender.com");

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
          <h1>CHATGRAM ❤️</h1>
          <h3>Avoid Calls join a Chat</h3>
          <input type="text" placeholder="Jhon..." onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
          <input type="text" placeholder="Room Id..." onChange={(event) => {
            setRoom(event.target.value);
          }} />
          <button onClick={joinRoom}>Join A Room</button>
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

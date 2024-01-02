import { useState } from "react";
import "./Login.css";
import { CiUser } from "react-icons/ci";
import { MdOutlineDoorFront } from "react-icons/md";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

const Login = () => {
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
    <div className="login">
      {!showChat ? (
        <div className="login-container">
          <p>Join a Chat</p>
          <div className="name-container">
            <label>Name</label>
            <CiUser className="icon"/>
            <input
              type="text"
              placeholder="Type your name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="room-container">
            <label>Room ID</label>
            <MdOutlineDoorFront className="icon"/>
            <input
              type="text"
              placeholder="Type your room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Login;

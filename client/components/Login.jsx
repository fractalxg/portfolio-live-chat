import { useState } from "react";
import "./Login.css"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

const Login = () => {
	const [username, setUsername] = useState("")
	const [room, setRoom] = useState("")

	const joinRoom = () => {
		if (username !=="" && room !== "") {

		}
	}

	return (
		<div className="login">
			<h3>Join a Chat</h3>
			<input 
			type="text" 
			placeholder="Name..." 
			onChange={(e) => setUsername(e.target.value)}
			/>
			<input type="text" 
			placeholder="Room ID..."
			onChange={(e) => setRoom(e.target.value)}
			/>
			<button onClick={joinRoom}>
				Join a Room
			</button>
		</div>
		);
	};
	
	export default Login;

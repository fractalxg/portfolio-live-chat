import { useEffect, useState, useMemo } from "react";
import "./Chat.css"
import { IoSend } from "react-icons/io5";

const Chat = ({socket, username, room}) => {
	const [currentMessage, setCurrentMessage] = useState("")

	const sendMessage = async () => {
		const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    const timeHoursMinutesSeconds = today.toLocaleTimeString()
		const split = timeHoursMinutesSeconds.split(":")
		const time = `${split[0]}:${split[1]}`

		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time: time,
			}

			await socket.emit("send_message", messageData)
		}
	}
	useEffect(() => {
		socket.on("receive_message", (data) => {
			console.log(data)
		})
	}, [socket])

	return (
		<div>
				<div className="chat-header">
					<p>Live Chat</p>
				</div>
				<div className="chat-body"></div>
				<div className="chat-footer">
					<input 
					type="text" 
					placeholder="Write a message..."
					onChange={(e) => setCurrentMessage(e.target.value)}
					/>
					<button onClick={sendMessage}><IoSend /></button>
				</div>
		</div>
		)
	}
	
	export default Chat
import { useEffect, useState, useMemo } from "react";
import "./Chat.css"
import { IoSend } from "react-icons/io5";
import  Message from "./Message.jsx";

const Chat = ({socket, username, room}) => {
	const [currentMessage, setCurrentMessage] = useState("")
	const [messageList, setMessageList] = useState([])

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
			setMessageList((list) => [...list, messageData])
		}
	}
	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data])
		})
	}, [socket])

	return (
		<div className="chat-window">
				<div className="chat-header">
					<p>Live Chat</p>
				</div>
				<div className="chat-body">
					<Message username={username} messageList={messageList}/>
				</div>
				<div className="chat-footer">
					<input 
					type="text" 
					placeholder="Write a message..."
					onChange={(e) => {setCurrentMessage(e.target.value)}}
					onKeyPress={(e) => {e.key === "Enter" && sendMessage()}}
					/>
					<button onClick={sendMessage}><IoSend /></button>
				</div>
		</div>
		)
	}
	
	export default Chat
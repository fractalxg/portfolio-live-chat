import { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { IoSend } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import Message from "./Message.jsx";

const Chat = ({ socket, username, room }) => {
  const chat = useRef(null);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messageIcon, setMessageIcon] = useState(true);

  const sendMessage = async () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const timeHoursMinutesSeconds = today.toLocaleTimeString();
    const split = timeHoursMinutesSeconds.split(":");
    const time = `${split[0]}:${split[1]}`;

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: time,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessageIcon(false);
      clearMessageInput();
    }
  };
  const message = useRef(null);
  const clearMessageInput = () => {
    const messageText = message.current;
    messageText.value = "";
  };

  const scrollToBottom = () => {
    const chatBody = chat.current;
    chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [sendMessage]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Room ID: {room}</p>
      </div>
      <div className="chat-body-background">
        <div ref={chat} className="chat-body">
          <div className="container-chat-icon">
            {messageIcon && <LuMessagesSquare className="chat-icon" />}
          </div>
          <Message username={username} messageList={messageList} />
        </div>
      </div>

      <div className="chat-footer">
        <input
          ref={message}
          type="text"
          placeholder="Write a message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>
          <IoSend className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default Chat;

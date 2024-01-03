import "./Message.css";

const Message = ({ username, messageList }) => {
  return (
    <div>
      {messageList &&
        messageList.map((messageContent, i) => (
          <div key={i}>
            <div className="message">
              <div className="message-content"
              id={username === messageContent.author ? "authorMessageContent" : "notAuthorMessageContent"}
              >
                
                <p className="author">{messageContent.author}</p>
                <div className="message-data-container">
                <p className="message-data"
                id={username === messageContent.author ? "authorMessageData" : "notAuthorMessageData"}
                >{messageContent.message}</p>
                </div>
                
                <div className="time-container">
                <p className="time">{messageContent.time}</p>
                </div> 
                
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Message;

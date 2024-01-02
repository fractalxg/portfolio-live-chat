import "./Message.css";

const Message = ({ username, messageList }) => {
  return (
    <div>
      {messageList &&
        messageList.map((messageContent, i) => (
          <div key={i}>
            <div 
            className="message"
            id={username === messageContent.author ? "author" : "notAuthor"}
            >
              <div className="message-content">
                <p>{messageContent.author}</p>
                <p>{messageContent.message}</p>
                <p>{messageContent.time}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Message;

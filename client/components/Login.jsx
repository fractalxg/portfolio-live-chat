import { useState, useRef } from "react";
import "./Login.css";
import { CiUser } from "react-icons/ci";
import { MdOutlineDoorFront } from "react-icons/md";
import io from "socket.io-client";
import Chat from "./Chat";
import { RevealX } from "./Animation.jsx";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from "react-i18next";

const socket = io.connect("http://localhost:3001");

const Login = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const languageRef = useRef();
  const [visible, setVisible] = useState(null);
  const [t, i18n] = useTranslation("global")

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const showHide = () => {
    const language = languageRef.current.getElementsByClassName("language-box");

    if (visible) {
      language[0].style.visibility = "hidden";
      setVisible(!visible);
    } else {
      language[0].style.visibility = "visible";
      setVisible(!visible);
    }
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    showHide()
  }

  return (
    <div className="container">
      <div className="login">
        {!showChat ? (
          <RevealX>
            <div className="login-container">
              <p>{t("login.login_container")}</p>
              <div className="name-container">
                <label>{t("login.name_label")}</label>
                <CiUser className="icon" />
                <input
                  type="text"
                  placeholder={t("login.name_placeholder")}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="room-container">
                <label>{t("login.room_label")}</label>
                <MdOutlineDoorFront className="icon" />
                <input
                  type="text"
                  placeholder={t("login.room_placeholder")}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && joinRoom();
                  }}
                />
              </div>
              <div className="button-container">
                <button onClick={joinRoom}>{t("login.button")}</button>
              </div>
              <div ref={languageRef} className="language">
                <div className="language-selection-container">
                  <p onClick={showHide}>{t("login.language_label")}</p>
                  <IoMdArrowDropdown />
                </div>

                <div className="language-box">
                  <p onClick={() => handleChangeLanguage("pt-br")}>{t("login.language_box_portuguese")}</p>
                  <p onClick={() => handleChangeLanguage("en-us")}>{t("login.language_box_english")}</p>
                </div>
              </div>
            </div>
          </RevealX>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </div>
  );
};

export default Login;

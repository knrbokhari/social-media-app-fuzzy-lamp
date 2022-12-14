import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { io } from "socket.io-client";
import ChatBox from "../../components/ChatBox/ChatBox";
import NavIcons from "../../components/NavIcons/NavIcons";
import Coversation from "../../components/Coversation/Coversation";
import { userChats } from "../../api/ChatRequests";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_baseUrl);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div style={{ height: "99vh" }}>
      <div className="d-none">
        <LogoSearch />
      </div>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="d-md-block">
            <LogoSearch />
          </div>
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats?.map((chat, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Coversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <div
            className="d-md-block"
            style={{ width: "20rem", alignSelf: "flex-end" }}
          >
            <NavIcons />
          </div>
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
      <div className="d-none">
        <NavIcons />
      </div>
    </div>
  );
};

export default Chat;

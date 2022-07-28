import React, { useState } from "react";
import "./RightSide.css";
import { AiFillHome, AiOutlineComment } from "react-icons/ai";
import { MdOutlineNotifications, MdSettings } from "react-icons/md";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <AiFillHome
          style={{
            fontSize: "25px",
            color: "#f95f35",
            cursor: "pointer",
          }}
        />
        <MdSettings
          style={{
            fontSize: "25px",
            color: "#f95f35",
            cursor: "pointer",
          }}
        />
        <MdOutlineNotifications
          style={{
            fontSize: "25px",
            color: "#f95f35",
            cursor: "pointer",
          }}
        />
        <AiOutlineComment
          style={{
            fontSize: "25px",
            color: "#f95f35",
            cursor: "pointer",
          }}
        />
      </div>

      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;

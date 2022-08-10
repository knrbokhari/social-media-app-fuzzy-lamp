import React, { useState } from "react";
import "./RightSide.css";
import { AiFillHome, AiOutlineComment } from "react-icons/ai";
import { MdOutlineNotifications, MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RightSide = () => {
  const user = useSelector((state) => state.authReducer.authData.user);

  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="/home">
          <AiFillHome
            style={{
              fontSize: "25px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
        <Link to="">
          <MdSettings
            style={{
              fontSize: "25px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
        <Link to="">
          <AiOutlineComment
            style={{
              fontSize: "25px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
        <Link to={`/profile/${user._id}`}>
          <CgProfile
            style={{
              fontSize: "25px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>

      <TrendCard />

      <button
        className="button r-button ShareModal"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;

import React, { useState } from "react";
import "./InfoCard.css";
import { FaPencilAlt } from "react-icons/fa";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useSelector } from "react-redux";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);

  const { about, livesin, worksAt, relationship } = user;

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <FaPencilAlt
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{relationship ? `in ${relationship}` : "---"}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{livesin ? livesin : "---"}</span>
      </div>

      <div className="info">
        <span>
          <b>Country </b>
        </span>
        <span>{livesin ? livesin : "---"}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{worksAt ? worksAt : "---"}</span>
      </div>

      <div className="info">
        <span>
          <b>About </b>
        </span>
        <span>{about ? about : "---"}</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;

import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { FaPencilAlt } from "react-icons/fa";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthAction";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests";
import { format } from "timeago.js";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const { about, livesIn, worksAt, relationship, createdAt, country } =
    profileUser;

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        // setProfileUser(user);
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data);
      } else {
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        // console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  // console.log(profileUser);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <FaPencilAlt
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
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
        <span>{livesIn ? livesIn : "---"}</span>
      </div>

      <div className="info">
        <span>
          <b>Country </b>
        </span>
        <span>{country ? country : "---"}</span>
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

      <div className="info">
        <span>
          <b>Created At </b>
        </span>
        <span>{format(createdAt)}</span>
      </div>

      {user._id === profileUserId ? (
        <button className="button logout-button" onClick={handleLogOut}>
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default InfoCard;

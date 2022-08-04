import React from "react";
import "./ProfileCard.css";
import cover from "../../img/cover.jpg";
import profile from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts } = useSelector((state) => state.PostReducer);

  const {
    firstname,
    lastname,
    profilePicture,
    coverPicture,
    worksAt,
    followers,
    following,
  } = user;

  const ProfilePage = false;
  return (
    <div className="ProfileCard">
      <div className="ProfileInames">
        <img src={coverPicture ? coverPicture : cover} alt="" />
        <img src={profilePicture ? profilePicture : profile} alt="" />
      </div>
      <div className="ProfileName">
        <span className="Name">{firstname + " " + lastname}</span>
        <span className="ProfileTitle">{worksAt ? worksAt : "---"}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span className="FollowingsNumber"> {following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="FollowersNumber">{followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "ProfilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "ProfilePage" ? (
        <div style={{ marginBottom: "1rem" }}></div>
      ) : (
        <span>
          <Link
            to={`/profile${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

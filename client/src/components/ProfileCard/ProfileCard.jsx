import React from "react";
import "./ProfileCard.css";
import cover from "../../img/cover.jpg";
import profile from "../../img/profileImg.jpg";

const ProfileCard = () => {
  const ProfilePage = false;
  return (
    <div className="ProfileCard">
      <div className="ProfileInames">
        <img src={cover} alt="" />
        <img src={profile} alt="" />
      </div>
      <div className="ProfileName">
        <span className="Name">Name</span>
        <span className="ProfileTitle">Full Stack Developer</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span className="FollowingsNumber">6,100</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="FollowersNumber">0</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;

import React from "react";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
// import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft location="Profile" />
      <div className="Profile-center">
        {/* <ProfileCard location={"ProfilePage"} /> */}
        <PostSide location={true} />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;

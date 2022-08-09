import React from "react";
import InfoCard from "../InfoCard/InfoCard";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./PostSide.css";

const PostSide = ({ location }) => {
  return (
    <div className="PostSide">
      {location && <ProfileCard location={"ProfilePage"} />}
      <div className="ProfileInfoCard">
        {location && <InfoCard location={true} />}
      </div>
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfoCard from "../InfoCard/InfoCard";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./PostSide.css";

const PostSide = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();
  console.log(id === user._id);
  return (
    <div className="PostSide">
      {location && <ProfileCard location={"ProfilePage"} />}
      <div className="ProfileInfoCard">
        {location && <InfoCard location={true} />}
      </div>
      {id === user._id && <PostShare />}
      <Posts />
    </div>
  );
};

export default PostSide;

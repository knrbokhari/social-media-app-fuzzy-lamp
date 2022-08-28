import React, { useState } from "react";
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
  const [refetchPosts, setRefetchPosts] = useState(false);

  return (
    <div className="PostSide">
      {location && <ProfileCard location={"ProfilePage"} refetchPosts={refetchPosts} setRefetchPosts={setRefetchPosts} />}
      <div className="ProfileInfoCard">
        {location && <InfoCard location={true} />}
      </div>
      {id ? (
        id === user._id && <PostShare setRefetchPosts={setRefetchPosts} />
      ) : (
        <PostShare setRefetchPosts={setRefetchPosts} />
      )}
      <Posts refetchPosts={refetchPosts} setRefetchPosts={setRefetchPosts} />
    </div>
  );
};

export default PostSide;

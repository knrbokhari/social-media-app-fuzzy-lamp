import React from "react";
import FollowersCard from "../../components/FollowersCard/FollowersCard";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";

const Follower = () => {
  return (
    <div className="home">
      <ProfileSide location={true} />
      <FollowersCard location={"h89"} />
      <RightSide location={"follower"} />
    </div>
  );
};

export default Follower;

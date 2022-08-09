import React from "react";
import InfoCard from "../InfoCard/InfoCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import FollowersCard from "../FollowersCard/FollowersCard";
import "./ProfileLeft.css";

const ProfileLeft = () => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <InfoCard location={true} />
      <FollowersCard location={true} />
    </div>
  );
};

export default ProfileLeft;

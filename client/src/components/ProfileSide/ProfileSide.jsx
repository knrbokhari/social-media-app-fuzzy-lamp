import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileSide.css";

const ProfileSide = ({ location }) => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <div className="MobileView">
        <ProfileCard />
        {!location && <FollowersCard />}
      </div>
    </div>
  );
};

export default ProfileSide;

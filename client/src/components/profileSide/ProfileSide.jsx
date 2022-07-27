import React from "react";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileSide.css";

const ProfileSide = () => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <ProfileCard />
    </div>
  );
};

export default ProfileSide;

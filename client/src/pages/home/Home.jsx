import React from "react";
import ProfileSide from "../../components/profileSide/ProfileSide";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <ProfileSide />
      <div className="postSite">Post</div>
      <div className="rightSite">Right Side</div>
    </div>
  );
};

export default Home;

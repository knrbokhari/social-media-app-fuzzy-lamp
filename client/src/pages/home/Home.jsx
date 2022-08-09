import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <ProfileSide />
      {/* <div className="homePost"> */}
      <PostSide />
      {/* </div> */}
      <RightSide />
    </div>
  );
};

export default Home;

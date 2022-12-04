import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const NavIcons = () => {
  const user = useSelector((state) => state.authReducer.authData.user);

  return (
    <div>
      <div className="navIcons">
        <Link to="/home">
          <AiFillHome
            style={{
              fontSize: "25px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
        <Link to="/follower">
          <FaUserFriends
            style={{
              fontSize: "30px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
        <Link to="/chat">
          <AiOutlineComment
            style={{
              fontSize: "30px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
        <Link to={`/profile/${user._id}`}>
          <CgProfile
            style={{
              fontSize: "30px",
              color: "#f95f35",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavIcons;

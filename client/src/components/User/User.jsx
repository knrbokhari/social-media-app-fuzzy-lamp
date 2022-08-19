import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Link } from "react-router-dom";

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower" style={{ marginTop: "5px" }}>
      <div>
        <img
          src={
            person.profilePicture
              ? person.profilePicture
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="followerImage"
        />
        <div className="name">
          <span>
            <Link
              to={`/profile/${person._id}`}
              style={{ textDecoration: "none", color: "#242d49" }}
            >
              {person.firstname + " " + person.lastname}
            </Link>
          </span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;

import React from "react";

const User = ({ person }) => {
  return (
    <div className="follower">
      <div>
        <img src={person.img} alt="followerImg" className="followerImage" />
        <div className="name">
          <span>{person.name}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button" type="submit">
        Follow
      </button>
    </div>
  );
};

export default User;

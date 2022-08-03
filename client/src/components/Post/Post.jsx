import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { deletePost, likePost } from "../../api/PostsRequests";
import { Menu, ActionIcon } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleliked = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDelete = (id) => {
    deletePost(id);
  };

  return (
    <div className="Post">
      <div className="deleteButton">
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <BsThreeDots />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Edit Post</Menu.Item>
            <Menu.Item>Preview</Menu.Item>
            <Menu.Item onClick={() => handleDelete(data._id)}>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="detail">
        <span>
          <b>username</b>
        </span>
        <br />
        <span> {data?.desc}</span>
      </div>
      <img src={data?.image} alt="" />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleliked}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      {/* <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div> */}
    </div>
  );
};

export default Post;

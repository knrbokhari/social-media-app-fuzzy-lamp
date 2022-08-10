import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { logout } from "../../actions/AuthAction";

const Posts = () => {
  const params = useParams();
  let [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      axios
        .get(`/posts/${user._id}/timeline`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("profile")).token
            }`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setPosts(res.data);
            // setDeletedPost(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
          }
        });
    };
    fetchPosts();
  }, [user._id, posts]);

  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {posts?.map((post, id) => {
        return <Post data={post} key={id} />;
      })}
    </div>
  );
};

export default Posts;

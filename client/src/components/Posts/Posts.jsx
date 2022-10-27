/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { logout } from "../../actions/AuthAction";

const Posts = ({ refetchPosts, setRefetchPosts }) => {
  const params = useParams();
  let [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  console.log(`http://localhost:5000/posts/timeline/${user._id}`);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`http://localhost:5000/posts/timeline/${user._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("profile")).token
            }`,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setPosts(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
          }
        });
    };
    if (refetchPosts) {
      setRefetchPosts(false);
    }
    fetchPosts();
  }, [user._id, refetchPosts, dispatch]);

  // if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {posts.length !== 0 ? (
        posts?.map((post, id) => {
          return (
            <Post data={post} setRefetchPosts={setRefetchPosts} key={id} />
          );
        })
      ) : (
        <p style={{ textAlign: "center" }}>No Posts</p>
      )}
    </div>
  );
};

export default Posts;

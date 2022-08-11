import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import cover from "../../img/cover.jpg";
import profile from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // let { posts } = useSelector((state) => state.PostReducer);
  let [posts, setPosts] = useState([]);

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
          console.log(err);
        });
    };
    fetchPosts();
  }, [posts, user._id]);

  const {
    firstname,
    lastname,
    profilePicture,
    coverPicture,
    worksAt,
    followers,
    following,
  } = user;

  return (
    <div className={`ProfileCard`}>
      <div className="ProfileInames">
        <img src={coverPicture ? coverPicture : cover} alt="" />
        <img src={profilePicture ? profilePicture : profile} alt="" />
      </div>
      <div className="ProfileName">
        <span className="Name">{firstname + " " + lastname}</span>
        <span className="ProfileTitle">{worksAt ? worksAt : "---"}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span className="FollowingsNumber"> {following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="FollowersNumber">{followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "ProfilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post?.userId === user?._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "ProfilePage" ? (
        <div style={{ marginBottom: "1rem" }}></div>
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

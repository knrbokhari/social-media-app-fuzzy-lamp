/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileCard.css";
import { MdOutlineAddAPhoto } from "react-icons/md";
import CoverModul from "../CoverModul/CoverModul";
import ProfileModal from "../ProfileModul/ProfileModul";
import * as UserApi from "../../api/UserRequests";
// import { toast } from "react-toastify";

const ProfileCard = ({ location, refetchPosts, setRefetchPosts }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [posts, setPosts] = useState([]);
  const [covermodalOpened, setCoverModalOpened] = useState(false);
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`http://localhost:5000/posts/timeline/${id || user._id}`, {
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
          // console.log(err);
        });
    };
    if (refetchPosts) {
      setRefetchPosts(false);
    }
    fetchPosts();
  }, [id, refetchPosts]);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        if (id === user._id) {
          setCurrentUser(user);
        } else {
          const profileUser = await UserApi.getUser(id);
          console.log(profileUser);
          setCurrentUser(profileUser.data);
        }
      } else {
        setCurrentUser(user);
      }
    };
    fetchUser();
  }, [id, user]);

  const {
    firstname,
    lastname,
    profilePicture,
    coverPicture,
    worksAt,
    followers,
    following,
  } = currentUser;

  return (
    <div className={`ProfileCard`}>
      <div className="ProfileInames">
        <img
          src={
            coverPicture
              ? coverPicture
              : "https://i.ibb.co/mFBLC5L/golden-stars-glitter-yellow-paper-background-festive-holiday-bright-backdrop-155694236.jpg"
          }
          alt=""
          className={`coverPicture ${
            location === "ProfilePage" ? "coverPivHe" : ""
          }`}
        />
        {id === user._id && location && (
          <MdOutlineAddAPhoto
            className="addCoverIcon"
            onClick={() => setCoverModalOpened(true)}
          />
        )}
        <CoverModul
          covermodalOpened={covermodalOpened}
          setCoverModalOpened={setCoverModalOpened}
        />

        <img
          src={
            profilePicture ? profilePicture : "https://i.ibb.co/q12WqWn/s3.jpg"
          }
          alt=""
          className="profilePicture"
        />
        {id === user._id && location && (
          <MdOutlineAddAPhoto
            className="addProfileIcon"
            onClick={() => setProfileModalOpened(true)}
          />
        )}
        <ProfileModal
          profileModalOpened={profileModalOpened}
          setProfileModalOpened={setProfileModalOpened}
        />
      </div>
      <div className="ProfileName">
        <span className="Name">{firstname + " " + lastname}</span>
        <span className="ProfileTitle">{worksAt ? worksAt : "---"}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span className="FollowingsNumber"> {following?.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="FollowersNumber">{followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "ProfilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post?.userId === id).length}
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

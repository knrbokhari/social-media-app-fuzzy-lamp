import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProfileCard.css";
import { MdOutlineAddAPhoto } from "react-icons/md";
import CoverModul from "../CoverModul/CoverModul";
import ProfileModal from "../ProfileModul/ProfileModul";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // let { posts } = useSelector((state) => state.PostReducer);
  let [posts, setPosts] = useState([]);
  const [covermodalOpened, setCoverModalOpened] = useState(false);
  const [profileModalOpened, setProfileModalOpened] = useState(false);

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
        <img
          src={
            coverPicture
              ? coverPicture
              : "https://i.ibb.co/mFBLC5L/golden-stars-glitter-yellow-paper-background-festive-holiday-bright-backdrop-155694236.jpg"
          }
          alt=""
          className="coverPicture"
        />
        {location && (
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
        {location && <MdOutlineAddAPhoto className="addProfileIcon" />}
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

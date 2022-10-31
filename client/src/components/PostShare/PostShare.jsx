import React, { useRef, useState } from "react";
import "./PostShare.css";
import { FiImage, FiPlayCircle } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
// import { logout } from "../../actions/AuthAction";
import { toast } from "react-toastify";

const PostShare = ({ setRefetchPosts }) => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  // const loading = useSelector((state) => state.PostReducer.uploading);

  const [image, setImage] = useState(null);
  const [shareImage, setShareImage] = useState(null);
  const [urlLink, setUrlLink] = useState("");
  const [post, setPost] = useState("");
  const imageRef = useRef();
  const postRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
      setShareImage(img);
    }
  };
  const onPostChange = (e) => {
    setPost(e.target.value);
  };

  const handleShare = async () => {
    const formData = new FormData();
    formData.append("image", shareImage);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageStorageKey}`;

    // uplode image to imgbb
    if (shareImage) {
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setUrlLink(result.data.url);
            createPost();
          }
        })
        .catch((error) => {
          // toast.error(error.message);
        });
    } else {
      createPost();
    }
  };

  // post data
  const data = {
    userId: user._id,
    desc: post,
    image: urlLink,
  };

  // crate new post
  const createPost = async () => {
    if (data.desc || data.image) {
      // dispatch({ type: "UPLOAD_START" });
      await axios
        .post(`${process.env.REACT_APP_baseUrl}posts`, data)
        .then((res) => {
          setImage(null);
          postRef.current.value = "";
          // dispatch({ type: "UPLOAD_SUCCESS" });
          setRefetchPosts(true);
          toast.success("UPLOAD SUCCESS");
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
          // if (err.response.status === 401 || err.response.status === 403) {
          //   dispatch(logout());
          // }
          // dispatch({ type: "UPLOAD_FAIL" });
          toast.error("UPLOAD FAIL");
        });
    } else {
      toast("Please give us an image or text..");
    }
  };

  return (
    <div className="PostShare">
      {/* <img src={ProfileImage} alt="" /> */}
      <div>
        <input
          type="text"
          ref={postRef}
          onChange={onPostChange}
          placeholder="What's happening?"
        />
        <div className="postOptions">
          <div
            className="option"
            style={{
              color: "var(--photo)",
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              flexDirection: "column",
            }}
            onClick={() => imageRef.current.click()}
          >
            <FiImage />
            Photo
          </div>
          <div
            className="option"
            style={{
              color: "var(--video)",
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              flexDirection: "column",
            }}
          >
            <FiPlayCircle />
            Video
          </div>
          {/* <div
            className="option"
            style={{
              color: "var(--location)",
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              flexDirection: "column",
            }}
          >
            <HiOutlineLocationMarker />
            Location
          </div> */}
          <div
            className="option"
            style={{
              color: "var(--shedule)",
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              flexDirection: "column",
            }}
          >
            <FaRegCalendarCheck />
            Shedule
          </div>
          <button
            className="button ps-button"
            onClick={handleShare}
            // disabled={loading}
          >
            Share
            {/* {loading ? "uploading" : "Share"} */}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <MdClear
              style={{ fontSize: "25px", color: "orange" }}
              onClick={() => setImage(null)}
            />
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;

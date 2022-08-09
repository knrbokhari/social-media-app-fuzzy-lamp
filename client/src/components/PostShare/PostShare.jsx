import React, { useRef, useState } from "react";
import "./PostShare.css";
import { FiImage, FiPlayCircle } from "react-icons/fi";
// import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.PostReducer.uploading);

  // console.log(loading);

  const [image, setImage] = useState(null);
  const [shareImage, setShareImage] = useState(null);
  const [urlLink, setUrlLink] = useState("");
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

  // const imageStorageKey = "71e150240c17a375529a9b50e8eb320e";

  const handleShare = async () => {
    const formData = new FormData();
    formData.append("image", shareImage);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageStorageKey}`;

    // console.log(shareImage);

    const data = {
      userId: user._id,
      desc: postRef.current.value || "",
      image: urlLink,
    };
    // console.log(data);

    // crate new post
    const createPost = async () => {
      if (data.image !== "") {
        dispatch({ type: "UPLOAD_START" });
        await axios
          .post("http://localhost:5000/posts", data)
          .then((res) => {
            console.log(res);
            setImage(null);
            postRef.current.value = "";
            dispatch({ type: "UPLOAD_SUCCESS" });
          })
          .catch((err) => {
            console.log(err);
            dispatch({ type: "UPLOAD_FAIL" });
          });
      }
    };

    // image not found
    if (!data.image) {
      createPost();
    }

    // uplode image to imgbb
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setUrlLink(result.data.url);
          createPost();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //
  };

  return (
    <div className="PostShare">
      {/* <img src={ProfileImage} alt="" /> */}
      <div>
        <input type="text" ref={postRef} placeholder="What's happening?" />
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
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
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

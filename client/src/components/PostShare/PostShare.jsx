import React, { useRef, useState } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import { FiImage, FiPlayCircle } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

const PostShare = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

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

  // console.log(user._id);

  const imageStorageKey = "71e150240c17a375529a9b50e8eb320e";

  const handleShare = async () => {
    const formData = new FormData();
    formData.append("image", shareImage);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    console.log(shareImage);

    // uplode image to imgbb
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.success) {
          setUrlLink(result.data.url);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //
    const data = {
      userId: user._id,
      desc: postRef.current.value || "",
      image: urlLink,
    };
    console.log(data);

    // crate new post
    if (urlLink || postRef.current.value) {
      await axios
        .post("http://localhost:5000/posts", data)
        .then((res) => {
          // console.log(res);
          setImage(null);
          postRef.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <button className="button ps-button" onClick={handleShare}>
            Share
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

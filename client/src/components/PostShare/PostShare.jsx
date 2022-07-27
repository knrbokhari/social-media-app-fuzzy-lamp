import React, { useRef, useState } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import { FiImage, FiPlayCircle } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input type="text" placeholder="What's happening?" />
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
          <div
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
          </div>
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
          <button className="button ps-button">Share</button>
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

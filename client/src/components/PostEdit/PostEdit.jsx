import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { MdClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.PostReducer.uploading);

  const [post, setPost] = useState([]);
  const [image, setImage] = useState(null);
  const [shareImage, setShareImage] = useState(null);
  const [urlLink, setUrlLink] = useState("");
  const [Upost, setUpost] = useState("");
  const imageRef = useRef();
  const postRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      axios
        .get(`http://localhost:5000/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("profile")).token
            }`,
          },
        })
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchPost();
  }, [id]);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
      setShareImage(img);
    }
  };

  //   post text
  const onPostChange = (e) => {
    setUpost(e.target.value);
  };

  //   console.log(Upost);

  const data = {
    userId: user._id,
    desc: Upost,
    image: urlLink,
  };

  // crate new post
  const createPost = async () => {
    if (data.desc || data.image) {
      dispatch({ type: "UPLOAD_START" });
      await axios
        .put(`http://localhost:5000/posts/${id}`, data)
        .then((res) => {
          console.log(res);
          setImage(null);
          postRef.current.value = "";
          navigate("/");
          dispatch({ type: "UPLOAD_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "UPLOAD_FAIL" });
        });
    } else {
      alert("please give us an image or test..");
    }
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
          // console.log(result);
          if (result.success) {
            setUrlLink(result.data.url);
            createPost();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createPost();
    }
  };

  //   console.log(post);

  return (
    <div className="PostShare" style={{ height: "89vh", display: "block" }}>
      <div className="">
        <textarea
          type="text"
          ref={postRef}
          onChange={onPostChange}
          placeholder={post.desc}
          rows="8"
        />
        {!image && (
          <input
            type="file"
            //   onClick={() => imageRef.current.click()}
            ref={imageRef}
            onChange={onImageChange}
          />
        )}
        {image && (
          <div className="previewImage">
            <MdClear
              style={{ fontSize: "25px", color: "orange" }}
              onClick={() => setImage(null)}
            />
            <img src={image.image} alt="" />
          </div>
        )}
        <button
          className="button ps-button"
          onClick={handleShare}
          disabled={loading}
          style={{ fontSize: "20px" }}
        >
          {loading ? "Uploading" : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default PostEdit;

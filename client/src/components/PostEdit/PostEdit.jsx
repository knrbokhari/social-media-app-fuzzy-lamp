import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { MdClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

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
      await axios
        .get(`http://localhost:5000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("profile")).token
            }`,
          },
        })
        .then((res) => {
          setPost(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPost();
  }, [id]);

  console.log(post);

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

  const data = {
    userId: user._id,
    desc: Upost,
    image: urlLink,
  };

  // crate new post
  const createPost = async () => {
    if (data.desc || data.image) {
      dispatch({ type: "UPLOAD_START" });
      const headers = {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
      };
      await axios
        .put(
          `http://localhost:5000/posts/${id}`,
          data,
          { headers }
          // {
          //   headers: {
          //     Authorization: `Bearer ${
          //       JSON.parse(localStorage.getItem("profile")).token
          //     }`,
          //   },
          // }
        )
        .then((res) => {
          setImage(null);
          postRef.current.value = "";
          navigate("/");
          toast.success("UPLOAD SUCCESS");
          dispatch({ type: "UPLOAD_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "UPLOAD_FAIL" });
          toast.error("UPLOAD FAIL");
          console.log(err);
        });
    } else {
      toast("please give us an image or text..");
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
          <input type="file" ref={imageRef} onChange={onImageChange} />
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
          style={{ fontSize: "20px" }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PostEdit;

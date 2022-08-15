import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ covermodalOpened, setCoverModalOpened }) => {
  const theme = useMantineTheme();
  const [coverImage, setCoverImage] = useState({});
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user._id === param.id);

    const formData = new FormData();
    formData.append("image", coverImage);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageStorageKey}`;

    // uplode image to imgbb
    if (coverImage) {
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          //   console.log(result);
          if (result.success) {
            const data = { coverPicture: result.data.url };
            dispatch(updateUser(param.id, data));
            // console.log(user);

            setCoverModalOpened(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={covermodalOpened}
      onClose={() => setCoverModalOpened(false)}
      title="Upload Cover image"
    >
      <form onSubmit={handleSubmit}>
        {/* <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
        </div> */}

        <div>
          <p style={{ display: "block", margin: "0 0 10px 0" }}>Cover image</p>
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button
          className="button infoButton"
          type="submit"
          style={{ margin: "50px auto 0" }}
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;

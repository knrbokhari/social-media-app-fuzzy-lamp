import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const dispatch = useDispatch();
  const param = useParams();

  // const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    dispatch(updateUser(param.id, UserData));

    setModalOpened(false);
  };
  // console.log(formData);

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
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      title="Your Info"
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        {/* <h3>Your Info</h3> */}
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          />
        </div>

        <div>
          <textarea
            value={formData.about}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="About"
            name="about"
            rows="100"
            style={{ height: "100px" }}
          ></textarea>
        </div>

        {/* <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
        </div>

        <div>
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div> */}

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

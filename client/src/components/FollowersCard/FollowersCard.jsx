/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { useSelector } from "react-redux";
import User from "../User/User";
import { getAllUser } from "../../api/UserRequests";
import FollowersModal from "../FollowersModal/FollowersModal";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  console.log(location !== "h89");

  return (
    <div className={`FollowersCard ${location === "h89" ? "h89" : ""}`}>
      <h3 style={{ marginTop: "1rem" }}>People you may know</h3>
      {location !== "h89" &&
        persons.slice(0, 5)?.map((person) => {
          if (person._id !== user._id)
            return <User person={person} key={person._id} />;
        })}

      {location === "h89" &&
        persons?.map((person) => {
          if (person._id !== user._id)
            return <User person={person} key={person._id} />;
        })}

      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;

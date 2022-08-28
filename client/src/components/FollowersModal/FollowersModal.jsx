/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { getAllUser } from "../../api/UserRequests";
import { useSelector } from "react-redux";
import User from "../User/User";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

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
      title="People you may know"
      onClose={() => setModalOpened(false)}
    >
      {persons?.map((person) => {
        if (person._id !== user._id) {
          return <User person={person} key={person._id} />;
        }
      })}
    </Modal>
  );
};

export default FollowersModal;

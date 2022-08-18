import React from "react";
import { useParams } from "react-router-dom";
import PostEdit from "../../components/PostEdit/PostEdit";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";

const EditPost = () => {
  const params = useParams();
  return (
    <div className="home">
      <ProfileSide location={"editPast"} />
      <PostEdit id={params.id} />
      <RightSide />
    </div>
  );
};

export default EditPost;

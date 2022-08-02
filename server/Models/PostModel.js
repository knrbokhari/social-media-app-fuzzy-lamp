import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String },
    desc: String,
    likes: [],
    comments: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;

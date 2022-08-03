import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createPost = () => API.post("/posts/");
export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`posts/${id}/like`, { userId: userId });
export const deletePost = (id, userId) => API.delete(`posts/${id}`);
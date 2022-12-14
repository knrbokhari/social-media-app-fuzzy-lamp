import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: process.env.REACT_APP_baseUrl,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createPost = () => API.post("/posts/");
export const getPost = (id) => API.get(`/posts/${id}`);
export const getTimelinePosts = (id) => API.get(`/posts/timeline/${id}`);
export const likePost = (id, userId) =>
  API.put(`posts/${id}/like`, { userId: userId });
export const deletePost = (id, setRefetchPosts) =>
  API.delete(`posts/${id}`).then((res) => {
    if (res.status === 200) {
      setRefetchPosts(true);
      toast.success(res.data);
    }
  });
export const updatePost = (id) => API.put(`posts/${id}`);

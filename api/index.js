// api/apiClient.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.254.63:3000";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("jwtToken"); // Retrieve token from AsyncStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token to request header
      }
      return config;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API calls
export const loginUser = async (loginData) => {
  return api.post("/api/login", loginData);
};

export const registerUser = async (userData) => {
  return api.post("/api/register", userData);
};

export const getAllCategories = async () => {
  return api.get("/api/category");
};
export const getAllProducts = async () => {
  return api.get("/api/product");
};

// // Blog Posts API calls
// export const fetchPosts = async () => {
//   return api.get("/api/blog");
// };

// export const fetchPostsByUser = async (userId) => {
//   return api.get(`/api/blog/user/${userId}`);
// };

// export const fetchPostById = async (postId) => {
//   return api.get(`/api/blog/${postId}`);
// };

// export const createPost = async (postData) => {
//   return api.post("/api/blog", postData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const updatePost = async (postId, postData) => {
//   return api.put(`/api/blog/${postId}`, postData);
// };

// export const deletePost = async (postId) => {
//   return api.delete(`/api/blog/${postId}`);
// };

export default api;

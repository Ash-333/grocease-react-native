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
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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

export const getAProductById = async (id) => {
  return api.get(`/api/product/${id}`);
};

export const getTopSellingProducts = async () => {
  return api.get(`/api/product/top-products`);
};

export const getAllProductsByCategory = async (cat) => {
  return api.get(`api/products/${cat}`);
};

export const getUserAddress = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return api.get(`/api/${userId}/addresses`);
};

export const addNewAddress = async (data) => {
  return api.post("/api/addresses", data);
};

export const placeOrder = async (orderData) => {
  return api.post("/api/order", orderData);
};

export default api;

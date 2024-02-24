import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5000/api/users";

const userService = {
  fetchAllUsers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Failed to update user");
    }
  },
  deleteUserAccount: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to delete user account"
      );
    }
  },
};

export default userService;

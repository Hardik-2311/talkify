import axios from "axios";
import toast from "react-hot-toast";
const API_URL = "http://localhost:5000/api/rooms";

const createChatRoomApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    toast.success("Chat room created successfully");
    return response.data.chatRoom;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to create chat room");
    throw new Error(
      error.response.data.message || "Failed to create chat room"
    );
  }
};

const kickUser = async (roomId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${roomId}/kick/${userId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to create chat room");
    throw new Error(
      toast.error(error.response.data.message) || "Failed to kick user"
    );
  }
};

const promoteToModerator = async (roomId, userIdToPromote) => {
  try {
    const response = await axios.put(
      `${API_URL}/${roomId}/promote/${userIdToPromote}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to create chat room");
    throw new Error(
      error.response.data.message || "Failed to promote user to moderator"
    );
  }
};

const joinChatRoomApi = async ({userId, roomId}) => {
  try {
    const response = await axios.post(`${API_URL}/join`, { userId, roomId });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to join chat room");
    throw new Error(error.response.data.message || "Failed to join chat room");
  }
};

const fetchChatRoomsApi = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to create chat room");
    throw new Error(
      error.response.data.message || "Failed to get chat rooms of user"
    );
  }
};

const deleteChatRoomApi = async (roomId) => {
  try {
    const response = await axios.delete(`${API_URL}/${roomId}`);
    toast.success("Chat room deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to create chat room");
    throw new Error(
      error.response.data.message || "Failed to delete chat room"
    );
  }
};
export {
  kickUser,
  promoteToModerator,
  joinChatRoomApi,
  fetchChatRoomsApi,
  createChatRoomApi,
  deleteChatRoomApi,
};

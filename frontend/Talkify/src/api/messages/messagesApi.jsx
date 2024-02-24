import axios from 'axios';

const API_URL = 'http://localhost:5000/api/messages';

// Function to create a new message
export const createMessage = async (messageData) => {
  try {
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to create message');
  }
};

// Function to fetch all messages
export const getAllMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch messages');
  }
};

// Function to fetch a message by ID
export const getMessageById = async (messageId) => {
  try {
    const response = await axios.get(`${API_URL}/${messageId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch message');
  }
};

// Function to update a message
export const updateMessage = async (messageId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${messageId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update message');
  }
};

// Function to delete a message
export const deleteMessage = async (messageId) => {
  try {
    const response = await axios.delete(`${API_URL}/${messageId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to delete message');
  }
};

// Function to fetch messages by chat room ID
export const getMessagesByChatRoomId = async (chatRoomId) => {
  try {
    const response = await axios.get(`${API_URL}/chatroom/${chatRoomId}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch messages');
  }
};

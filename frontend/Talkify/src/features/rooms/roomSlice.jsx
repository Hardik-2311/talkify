import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchChatRoomsApi,
  createChatRoomApi,
  deleteChatRoomApi,
  joinChatRoomApi,
} from "../../api/Chatrooms/roomsApi";

const initialState = {
  chatRooms: [],
  status: "idle",
  error: null,
};

export const fetchChatRoomsAsync = createAsyncThunk(
  "chatRoom/fetchChatRooms",
  async () => {
    const response = await fetchChatRoomsApi();
    return response;
  }
);

export const createChatRoomAsync = createAsyncThunk(
  "chatRoom/createChatRoom",
  async (userData) => {
    const response = await createChatRoomApi(userData);
    return response;
  }
);

export const deleteChatRoomAsync = createAsyncThunk(
  "chatRoom/deleteChatRoom",
  async (roomId) => {
    const response = await deleteChatRoomApi(roomId);
    return response;
  }
);

export const joinChatRoomAsync = createAsyncThunk(
  "chatRoom/joinChatRoom",
  async ({ userId, roomId }) => {
    const response = await joinChatRoomApi({ roomId, userId });
    return response;
  }
);

export const fetchChatRoomOfUserAsync = createAsyncThunk(
  "chatRoom/fetchRoomsOfUser",
  async (userId) => {
    const response = await joinChatRoomApi(userId);
    return response;
  }
);

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRoomsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatRoomsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chatRooms = action.payload;
      })
      .addCase(fetchChatRoomsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createChatRoomAsync.fulfilled, (state, action) => {
        state.chatRooms.push(action.payload);
      })
      .addCase(deleteChatRoomAsync.fulfilled, (state, action) => {
        state.chatRooms = action.payload.rooms;
      })
      .addCase(joinChatRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinChatRoomAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update state based on the response, if needed
      })
      .addCase(joinChatRoomAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchChatRoomOfUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatRoomOfUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chatRooms = action.payload;
      })
      .addCase(fetchChatRoomOfUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default chatRoomSlice.reducer;

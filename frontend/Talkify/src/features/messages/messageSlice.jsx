import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as messagesApi from "../../api/messages/messagesApi";

// Async thunk to fetch all messages
export const fetchMessagesAsync = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const messages = await messagesApi.getAllMessages();
    console.log(messages);
    return messages;
  }
);

// Async thunk to create a new message
export const createMessageAsync = createAsyncThunk(
  "messages/createMessage",
  async (messageData) => {
    const newMessage = await messagesApi.createMessage(messageData);
    return newMessage.newMessage;
  }
);

// Async thunk to update a message
export const updateMessageAsync = createAsyncThunk(
  "messages/updateMessage",
  async ({ messageId, updatedData }) => {
    const updatedMessage = await messagesApi.updateMessage(
      messageId,
      updatedData
    );
    return updatedMessage;
  }
);

// Async thunk to delete a message
export const deleteMessageAsync = createAsyncThunk(
  "messages/deleteMessage",
  async ({ messageId }) => {
    console.log(messageId);
    const response = await messagesApi.deleteMessage(messageId);
    console.log(response.remainingMessages)
  }
);

// Async thunk to fetch messages by chat room ID
export const fetchMessagesByChatRoomIdAsync = createAsyncThunk(
  "messages/fetchMessagesByChatRoomId",
  async (chatRoomId) => {
    const messages = await messagesApi.getMessagesByChatRoomId(chatRoomId);
    return messages.data;
  }
);

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesAsync.pending, (state) => {
        state.status = "loading";
      })
        .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.messages = action.payload;
        })
      .addCase(fetchMessagesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createMessageAsync.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(updateMessageAsync.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (message) => message.id === action.payload.id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(deleteMessageAsync.fulfilled, (state, action) => {
      })
      .addCase(fetchMessagesByChatRoomIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessagesByChatRoomIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessagesByChatRoomIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;

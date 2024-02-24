// getCurrentUserSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../api/users/UserApi";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    try {
      const currentUser = await userService.getCurrentUserApi();
      return currentUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const getCurrentUserSlice = createSlice({
  name: "getCurrentUser",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getCurrentUserSlice.reducer;

// allUsersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../api/users/UserApi";

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async () => {
    try {
      const usersData = await userService.fetchAllUsers();
      return usersData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allUsersSlice.reducer;

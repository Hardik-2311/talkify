// deleteUserSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../api/users/UserApi";

export const deleteUserAccount = createAsyncThunk(
  "user/deleteAccount",
  async (userId) => {
    const response = await userService.deleteUserAccount(userId);
    return response.data;
  }
);

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default deleteUserSlice.reducer;

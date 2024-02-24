// logoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../api/users/UserApi";

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await userService.logout();
  return response.data;
});

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;

// registerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../api/users/UserApi";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const response = await userService.register(userData);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;

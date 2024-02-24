import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { promoteToModerator } from "../../api/Chatrooms/roomsApi";

export const promoteUserToModeratorAction = createAsyncThunk(
  "chatRooms/promoteUserToModerator",
  async ({ roomId, userIdToPromote }, thunkAPI) => {
    try {
      const response = await promoteToModerator(roomId, userIdToPromote);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const promoteUserToModeratorSlice = createSlice({
  name: "promoteUserToModerator",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(promoteUserToModeratorAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(promoteUserToModeratorAction.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "User promoted to moderator successfully";
      })
      .addCase(promoteUserToModeratorAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promoteUserToModeratorSlice.reducer;

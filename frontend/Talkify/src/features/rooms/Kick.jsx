import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { kickUser } from '../../api/Chatrooms/roomsApi';

export const kickUserFromRoom = createAsyncThunk(
  'chatRooms/kickUser',
  async ({ roomId, userId }, thunkAPI) => {
    try {
      const response = await kickUser(roomId, userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const kickUserSlice = createSlice({
  name: 'kickUser',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(kickUserFromRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(kickUserFromRoom.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'User kicked successfully';
      })
      .addCase(kickUserFromRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kickUserSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/users/userSlice"
import roomReducer from '../features/rooms/roomSlice';
import messageReducer from "../features/messages/messageSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    message: messageReducer,
  },
});

export default store;

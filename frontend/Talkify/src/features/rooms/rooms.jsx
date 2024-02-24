import { combineReducers } from "redux";
import joinRoomReducer from "./joinRoom";
import createRoomReducer from "./CreateRoom";
import kickUserReducer from "./Kick";
import promoteUserReducer from "./Promote";
import chatRoomReducer from "./GetRooms";
import deleteRoomReducer from "./DeleteRoom";

const roomReducer = combineReducers({
  joinRoom: joinRoomReducer,
  kickUser: kickUserReducer,
  promoteUser: promoteUserReducer,
  getRooms: chatRoomReducer,
  createRoom: createRoomReducer,
  deleteRoom: deleteRoomReducer,
});

export default roomReducer;

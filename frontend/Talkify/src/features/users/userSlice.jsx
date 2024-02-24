import { combineReducers } from "@reduxjs/toolkit";
import logoutReducer from "./LogoutSlice";
import deleteReducer from "./DeleteSlice";
import allUsersReducer from "./AllUsers";
import CurrentUserReducer from "./CurrentUser";
import UpdateReducer from "./UpdateSlice";
const userReducer = combineReducers({
  Current: CurrentUserReducer,
  logout: logoutReducer,
  delete: deleteReducer,
  allUsers: allUsersReducer,
  update: UpdateReducer,
});

export default userReducer;

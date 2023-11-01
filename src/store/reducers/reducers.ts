import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import toggle from "./toggle";

export default combineReducers({
  auth,
  toggle,
});

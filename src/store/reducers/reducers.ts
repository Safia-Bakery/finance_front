import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import sorter from "./sorter";

export default combineReducers({
  auth,
  sorter,
});

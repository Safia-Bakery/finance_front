import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { MainPermissions } from "src/utils/types";

interface State {
  token: string | null;
  permissions?: { [key in MainPermissions]: boolean };
  link: string;
}

const initialState: State = {
  token: null,
  permissions: undefined,
  link: "/home",
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.token = null;
      // const { pathname, search } = window.location;
      // if (pathname.includes("login")) state.link = "/home";
      // else state.link = pathname + search;
    },
    loginHandler: (state, { payload }) => {
      state.token = payload;
    },
    permissionHandler: (state, { payload }: PayloadAction<any[]>) => {
      const permissions = payload.reduce((acc, number) => {
        acc[number] = true;
        return acc;
      }, {});
      state.permissions = permissions;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;
export const permissionSelector = (state: RootState) => state.auth.permissions;
export const linkSelector = (state: RootState) => state.auth.link;

export const { loginHandler, logoutHandler, permissionHandler } =
  authReducer.actions;

export default authReducer.reducer;

import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import {
  loginHandler,
  logoutHandler,
  //   permissionSelector,
  tokenSelector,
} from "src/redux/reducers/auth";
import useToken from "src/hooks/useToken";
// import BreadCrump from "../BreadCrump";
import Sidebar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { lazy, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import useQueryString from "src/hooks/useQueryString";
import Login from "src/pages/Login";
import Home from "src/pages/Home";
import ControlPanel from "src/pages/ControlPanel";
import Orders from "src/pages/Orders";
import AddOrder from "src/pages/AddOrder";

export const routes = [
  // {
  //   element: <ControlPanel />,
  //   path: "/home",
  //   screen: MainPermissions.add_brigada,
  // },
  //   {
  //     element: <RemainsInStock />,
  //     path: "/items-in-stock/:id",
  //     screen: MainPermissions.get_warehouse_retail,
  //   },
];

const Navigation = () => {
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const tokenKey = useQueryString("key");
  const dispatch = useAppDispatch();
  //   const permission = useAppSelector(permissionSelector);
  const { error, data: user } = useToken({});
  const { pathname, search } = useLocation();

  //   const renderSidebar = useMemo(() => {
  //     if (!!permission && !!token)
  //       return (
  //         <>
  //           <CustomSidebar />
  //           {/* <BreadCrump /> */}
  //         </>
  //       );
  //   }, [permission, token]);

  const renderScreen = useMemo(() => {
    return null;
    // if (!!permission && !!token)
    //   return routes.map((route) => {
    //     if (!!permission?.[route.screen]) {
    //       return (
    //         <Route
    //           key={route.path}
    //           element={<Suspend>{route.element}</Suspend>}
    //           path={route.path}
    //         />
    //       );
    //     }
    //   });
  }, [routes, token]);

  useEffect(() => {
    // if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  useEffect(() => {
    if (!!tokenKey) {
      dispatch(loginHandler(tokenKey));
      navigate(pathname + search);
    }
  }, [tokenKey]);

  //   useEffect(() => {
  //     if (!!user?.permissions.length && !!token)
  //       dispatch(permissionHandler(user?.permissions));
  //   }, [user?.permissions, token]);

  return (
    <>
      {/* {renderSidebar} */}

      <Sidebar />
      <div className="pl-[260px]">
        <Routes>
          <Route element={<Login />} path={"/login"} />

          <Route element={<Home />} path={"/home"} />
          <Route element={<ControlPanel />} path={"/"} />
          <Route element={<Orders />} path={"/orders"} />
          <Route element={<AddOrder />} path={"/orders/add"} />
          {/* {renderScreen} */}
        </Routes>
      </div>
    </>
  );
};

export default Navigation;

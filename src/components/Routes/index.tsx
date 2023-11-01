import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import {
  loginHandler,
  logoutHandler,
  //   permissionSelector,
  tokenSelector,
} from "src/store/reducers/auth";
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
import Users from "src/pages/Users";
import { MainPermissions } from "src/utils/types";
import EditAddUser from "src/pages/EditAddUser";
import EditAddRole from "src/pages/EditAddRole";
import Roles from "src/pages/Roles";
import Spheres from "src/pages/Spheres";
import EditAddSphere from "src/pages/EditAddSphere";

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
          <Route element={<AddOrder />} path={"/orders/:id"} />

          <Route element={<Orders />} path={"/purchasing"} />
          <Route element={<Orders />} path={"/finance"} />
          <Route element={<Orders />} path={"/accounting"} />
          <Route element={<Orders />} path={"/archieve"} />
          <Route
            element={
              <Users
                edit={MainPermissions.filling}
                add={MainPermissions.filling}
              />
            }
            path={"/users"}
          />
          <Route element={<EditAddUser />} path={"/users/:id"} />
          <Route element={<EditAddUser />} path={"/users/add"} />

          <Route element={<Roles />} path={"/roles"} />
          <Route element={<EditAddRole />} path={"/role/add"} />
          <Route element={<EditAddRole />} path={"/role/:id"} />

          <Route element={<Spheres />} path={"/spheres"} />
          <Route element={<EditAddSphere />} path={"/spheres/add"} />
          <Route element={<EditAddSphere />} path={"/spheres/:id"} />

          {/* {renderScreen} */}
        </Routes>
      </div>
    </>
  );
};

export default Navigation;

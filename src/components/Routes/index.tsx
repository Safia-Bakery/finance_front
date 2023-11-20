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
import PurchasingDepartment from "src/pages/PurchasingDepartment";
import FinanceDepartment from "src/pages/FinanceDepartment";
import Accounting from "src/pages/Accounting";
import Archive from "src/pages/Archive";
import Loading from "../Loader";
import cl from "classnames";
import ShowRole from "src/pages/ShowRole";
import EditAddSphereUsers from "src/pages/EditAddSphereUsers";
import SphereUsers from "src/pages/SphereUsers";
import Payers from "src/pages/Payers";
import EditAddPayers from "src/pages/EditAddPayers";
// import Logs from "src/pages/Logs";

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
  const dispatch = useAppDispatch();
  const { error, data: user, isLoading } = useToken({});
  const { pathname, search } = useLocation();

  const renderSidebar = useMemo(() => {
    if (!!token) return <Sidebar />;
  }, [token]);

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
    if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  // if (isLoading && token) return <Loading absolute />;

  return (
    <>
      {renderSidebar}
      <div className={cl({ ["pl-[280px]"]: !!token })}>
        <Routes>
          <Route element={<Login />} path={"/login"} />

          <Route element={<Home />} path={"/home"} />
          <Route element={<ControlPanel />} path={"/"} />
          <Route element={<Orders />} path={"/orders"} />
          <Route element={<AddOrder />} path={"/orders/add"} />
          <Route element={<AddOrder />} path={"/orders/:id"} />

          <Route element={<PurchasingDepartment />} path={"/purchasing"} />
          <Route element={<FinanceDepartment />} path={"/finance"} />
          <Route element={<Accounting />} path={"/accounting"} />
          <Route element={<Archive />} path={"/archieve"} />
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
          <Route element={<EditAddRole />} path={"/roles/add"} />
          <Route element={<EditAddRole />} path={"/roles/:id"} />
          <Route element={<ShowRole />} path={"/permission/:id"} />

          <Route element={<Spheres />} path={"/spheres"} />
          <Route element={<EditAddSphere />} path={"/spheres/add"} />
          <Route element={<EditAddSphere />} path={"/spheres/:id"} />

          <Route element={<Payers />} path={"/payers"} />
          <Route element={<EditAddPayers />} path={"/payers/add"} />
          <Route element={<EditAddPayers />} path={"/payers/:id"} />

          <Route element={<SphereUsers />} path={"/sphere-users/:sphere_id"} />
          <Route
            element={<EditAddSphereUsers />}
            path={"/sphere-users/:sphere_id/add"}
          />
          <Route
            element={<EditAddSphereUsers />}
            path={"/sphere-users/:sphere_id/:user_id"}
          />

          {/* {renderScreen} */}
        </Routes>
      </div>
    </>
  );
};

export default Navigation;

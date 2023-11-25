import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { lazy, useEffect, useMemo } from "react";
import useToken from "./hooks/useToken";
import Suspend from "./components/Suspend";
import { MainPermissions } from "src/utils/types";
import { useAppDispatch, useAppSelector } from "./store/utils/types";
import { tokenSelector } from "./store/reducers/auth";
import { sortHandler } from "./store/reducers/sorter";
import useUpdateEffect from "src/hooks/useUpdateEffect";
import useSphereUsers from "./hooks/useSphereUsers";
import ControlPanel from "src/pages/ControlPanel";
import Navigation from "src/components/Routes";
// import Home from "src/pages/Home";
// import Orders from "src/pages/Orders";
// import EditAddOrder from "src/pages/EditAddOrder";
// import Users from "src/pages/Users";
// import EditAddUser from "src/pages/EditAddUser";
// import EditAddRole from "src/pages/EditAddRole";
// import Roles from "src/pages/Roles";
// import Spheres from "src/pages/Spheres";
// import EditAddSphere from "src/pages/EditAddSphere";
// import Archive from "src/pages/Archive";
// import ShowRole from "src/pages/ShowRole";
// import EditAddSphereUsers from "src/pages/EditAddSphereUsers";
// import SphereUsers from "src/pages/SphereUsers";
// import Payers from "src/pages/Payers";
// import EditAddPayers from "src/pages/EditAddPayers";

// import Logs from "./pages/LogsScreen";

const Login = lazy(() => import("src/pages/Login"));

const Home = lazy(() => import("src/pages/Home"));
const Orders = lazy(() => import("src/pages/Orders"));
const EditAddOrder = lazy(() => import("src/pages/EditAddOrder"));
const Users = lazy(() => import("src/pages/Users"));
const EditAddUser = lazy(() => import("src/pages/EditAddUser"));
const EditAddRole = lazy(() => import("src/pages/EditAddRole"));
const Roles = lazy(() => import("src/pages/Roles"));
const Spheres = lazy(() => import("src/pages/Spheres"));
const EditAddSphere = lazy(() => import("src/pages/EditAddSphere"));
const Archive = lazy(() => import("src/pages/Archive"));
const ShowRole = lazy(() => import("src/pages/ShowRole"));
const EditAddSphereUsers = lazy(() => import("src/pages/EditAddSphereUsers"));
const SphereUsers = lazy(() => import("src/pages/SphereUsers"));
const Payers = lazy(() => import("src/pages/Payers"));
const EditAddPayers = lazy(() => import("src/pages/EditAddPayers"));
const Logs = lazy(() => import("./pages/LogsScreen"));

const routes = [
  // {
  //   element: <Login />, path: "/clients/add",screen: MainPermissions.add_order,
  // },
  // {
  //   element: <Home />, path: "*",screen: MainPermissions.add_order,
  // },
  // {
  //   element: <ControlPanel />, path: "/",screen: MainPermissions.add_order,
  // },
  {
    element: <Orders />,
    path: "/orders/all",
    screen: MainPermissions.orders,
  },
  {
    element: <EditAddOrder />,
    path: "/orders/add",
    screen: MainPermissions.add_order,
  },
  {
    element: <EditAddOrder />,
    path: "/orders/:id",
    screen: MainPermissions.edit_orders,
  },
  {
    element: <Orders />,
    path: "/orders/:user_id/sphere",
    screen: MainPermissions.orders,
  },

  {
    element: <Orders />,
    path: "/archieve",
    screen: MainPermissions.archieve,
  },

  {
    element: <EditAddUser />,
    path: "/users/:id",
    screen: MainPermissions.edit_user,
  },
  {
    element: <EditAddUser />,
    path: "/users/add",
    screen: MainPermissions.add_user,
  },
  {
    element: <Roles />,
    path: "/roles",
    screen: MainPermissions.roles,
  },
  {
    element: <EditAddRole />,
    path: "/roles/add",
    screen: MainPermissions.add_role,
  },
  {
    element: <EditAddRole />,
    path: "/roles/:id",
    screen: MainPermissions.edit_roles,
  },
  {
    element: <ShowRole />,
    path: "/permission/:id",
    screen: MainPermissions.edit_roles,
  },
  {
    element: <Spheres />,
    path: "/spheres",
    screen: MainPermissions.spheres,
  },
  {
    element: <EditAddSphere />,
    path: "/spheres/add",
    screen: MainPermissions.add_sphere,
  },
  {
    element: <EditAddSphere />,
    path: "/spheres/:id",
    screen: MainPermissions.edit_sphere,
  },
  {
    element: <Payers />,
    path: "/payers",
    screen: MainPermissions.payers,
  },
  {
    element: <EditAddPayers />,
    path: "/payers/add",
    screen: MainPermissions.add_payers,
  },
  {
    element: <EditAddPayers />,
    path: "/payers/:id",
    screen: MainPermissions.edit_payers,
  },
  {
    element: <Logs />,
    path: "/logs/:id",
    screen: MainPermissions.orders,
  },
  {
    element: <SphereUsers />,
    path: "/sphere-users/:sphere_id",
    screen: MainPermissions.sphere_users,
  },

  {
    element: <EditAddSphereUsers />,
    path: "/sphere-users/:sphere_id/add",
    screen: MainPermissions.add_sphere_users,
  },
  {
    element: <EditAddSphereUsers />,
    path: "/sphere-users/:sphere_id/:user_id",
    screen: MainPermissions.edit_sphere_users,
  },
  {
    element: (
      <Users edit={MainPermissions.edit_user} add={MainPermissions.add_user} />
    ),
    path: "/users",
    screen: MainPermissions.users,
  },
];

const App = () => {
  const token = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();
  const { data } = useSphereUsers({ enabled: !!token });
  const { data: me } = useToken({});
  const navigate = useNavigate();

  const permission = me?.permissions;

  const renderScreen = useMemo(() => {
    if (!!permission && !!token)
      return routes.map((route) => {
        if (!!permission?.[route.screen]) {
          return (
            <Route
              key={route.path}
              element={<Suspend>{route.element}</Suspend>}
              path={route.path}
            />
          );
        }
      });

    return null;
  }, [permission, token]);

  useUpdateEffect(() => {
    if (!!data?.length) dispatch(sortHandler(data));
  }, [data]);

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/home");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          element={
            <Suspend>
              <Home />
            </Suspend>
          }
          index
          path={"home"}
        />
        <Route
          element={
            <Suspend>
              <Home />
            </Suspend>
          }
          path={"*"}
        />
        <Route
          element={
            <Suspend>
              <Login />
            </Suspend>
          }
          path={"login"}
        />
        {renderScreen}
      </Route>
    </Routes>
  );
};

export default App;

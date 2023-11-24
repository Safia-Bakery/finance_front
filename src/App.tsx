import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "src/components/Routes";
import Login from "src/pages/Login";
import Home from "src/pages/Home";
import ControlPanel from "src/pages/ControlPanel";
import Orders from "src/pages/Orders";
import EditAddOrder from "src/pages/EditAddOrder";
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
import ShowRole from "src/pages/ShowRole";
import EditAddSphereUsers from "src/pages/EditAddSphereUsers";
import SphereUsers from "src/pages/SphereUsers";
import Payers from "src/pages/Payers";
import EditAddPayers from "src/pages/EditAddPayers";
import useSphereUsers from "./hooks/useSphereUsers";
import { useAppDispatch, useAppSelector } from "./store/utils/types";
import { tokenSelector } from "./store/reducers/auth";
import { sortHandler } from "./store/reducers/sorter";
import useUpdateEffect from "src/hooks/useUpdateEffect";

dayjs.locale("ru");

const App = () => {
  const token = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();
  const { data } = useSphereUsers({ enabled: !!token });

  useUpdateEffect(() => {
    if (!!data?.length) dispatch(sortHandler(data));
  }, [data]);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route element={<Login />} path={"/login"} />

        <Route element={<Home />} path={"/home"} />
        <Route element={<Home />} path={"*"} />
        <Route element={<ControlPanel />} path={"/"} />
        <Route element={<Orders />} path={"/orders/all"} />
        <Route element={<EditAddOrder />} path={"/orders/add"} />
        <Route element={<EditAddOrder />} path={"/orders/:id"} />

        <Route element={<Orders />} path={"/orders/:user_id/sphere"} />

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
      </Route>
    </Routes>
  );
};

export default App;

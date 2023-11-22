import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { logoutHandler, tokenSelector } from "src/store/reducers/auth";
import useToken from "src/hooks/useToken";
import Sidebar from "../Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import cl from "classnames";
import Container from "../Container";
import Loading from "../Loader";

const Navigation = () => {
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading } = useToken({});

  const renderSidebar = useMemo(() => {
    if (!!token) return <Sidebar />;
  }, [token]);

  useEffect(() => {
    if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);
  if (isLoading && !!token) return <Loading absolute />;

  return (
    <>
      {renderSidebar}
      <div className={cl({ ["pl-[260px]"]: !!token })}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default Navigation;

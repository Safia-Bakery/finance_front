import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { logoutHandler } from "src/store/reducers/auth";
import { MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";
import { sortedUsers } from "src/store/reducers/sorter";
import Typography, { TextSize, Weight } from "../Typography";

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { data } = useToken({});
  const sphereUsers = useAppSelector(sortedUsers);

  const dispatch = useAppDispatch();
  const permission = data?.permissions;
  const { data: me } = useToken({ enabled: false });

  const handleLogout = () => dispatch(logoutHandler());
  const routes = useMemo(() => {
    const init = [
      {
        name: "Отчёты",
        url: "/reports",
        screen: MainPermissions.reports,
        hasline: true,
      },
      {
        name: "Все заявки",
        url: "/orders/all",
        screen: MainPermissions.fillings,
      },
      {
        name: "Архив",
        url: "/archieve",
        screen: MainPermissions.archieve,
        hasline: true,
      },
      {
        name: "Сотрудники",
        url: "/users",
        screen: MainPermissions.users,
      },
      {
        name: "Роли",
        url: "/roles",
        screen: MainPermissions.roles,
      },
      {
        name: "Плательщики",
        url: "/payers",
        screen: MainPermissions.payers,
      },
      { name: "Сферы", url: "/spheres", screen: MainPermissions.spheres },
      { name: "Настройки", url: "/settings", screen: MainPermissions.settings },
    ];

    const sphere = sphereUsers
      ?.filter((item) => !!item?.sp_user?.show)
      .map((user) => {
        return {
          name: user?.sp_user?.full_name,
          url: `/orders/${user.user_id}/sphere`,
          screen: MainPermissions.orders,
        };
      });
    if (!!sphere?.length) return init.slice(0, 2).concat(sphere, init.slice(2));
    else return init;
  }, [sphereUsers]);
  if (!permission) return;

  return (
    <div className={cl(styles.sidebar)}>
      <div className={styles.block}>
        <div className="cursor-pointer" onClick={() => navigate("/home")}>
          <div className="p-5">
            <Typography size={TextSize.M} weight={Weight.bold}>
              FINANCE DEPARTMENT
            </Typography>
          </div>
          <div className={styles.line} />
        </div>
        <ul className={styles.mainList}>
          <li className={cl(styles.navItem)}>
            <Link
              className={cl(styles.link, {
                [styles.active]: pathname === "/home",
              })}
              to={"/home"}
            >
              <Typography>Главная страница</Typography>
            </Link>
          </li>
          {routes.map((route) => {
            if (route?.screen && permission?.[route?.screen]) {
              return (
                <Fragment key={route.url + route.name}>
                  <li className={cl("nav-item")}>
                    <Link
                      className={cl(
                        "nav-link d-flex align-items-center",
                        styles.link,
                        {
                          [styles.active]: pathname.includes(route.url),
                        }
                      )}
                      to={route.url}
                      state={{ name: route.name }}
                    >
                      <Typography>{route.name}</Typography>
                    </Link>
                  </li>
                  {route.hasline && <div className={styles.line} />}
                </Fragment>
              );
            }
          })}
        </ul>
      </div>
      <span onClick={handleLogout} className={styles.logout}>
        Выйти ({me?.user?.username})
      </span>
    </div>
  );
};

export default Sidebar;

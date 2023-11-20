import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useMemo, useState } from "react";
import { useAppDispatch } from "src/store/utils/types";
import { logoutHandler } from "src/store/reducers/auth";
import { MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";

const routes = [
  { name: "Главная страница", url: "/home", param: "?" },
  {
    name: "Отчёты",
    url: "/reports",
    screen: MainPermissions.reports,
  },
  { name: "Все заявки", url: "/orders", screen: MainPermissions.fillings },
  {
    name: "Отдел закупа",
    url: "/purchasing",
    screen: MainPermissions.purchasing_dep,
  },
  {
    name: "Финансовый отдел",
    url: "/finance",
    screen: MainPermissions.finance,
  },
  {
    name: "Бухгалтерия",
    url: "/accounting",
    screen: MainPermissions.accounting,
  },
  { name: "Архив", url: "/archieve", screen: MainPermissions.archieve },
  {
    name: "Сотрудники",
    url: "/users",
    hasline: true,
    screen: MainPermissions.employees,
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

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const permission = { 1: true, 2: true };
  const { data: me } = useToken({ enabled: false });

  const handleLogout = () => dispatch(logoutHandler());

  if (!permission) return;

  return (
    <div className={cl(styles.sidebar)}>
      <div className={styles.block}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            className="w-full m-3"
            src="/assets/icons/main-logo.svg"
            alt="safia-logo"
          />
        </div>
        <ul className={styles.mainList}>
          <li className={cl(styles.navItem)}>
            <Link
              className={cl(styles.link, {
                [styles.active]: pathname === "/home",
              })}
              to={"/home"}
            >
              <p className={styles.content}>Главная страница</p>
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
                      <p className={styles.content}>{route.name}</p>
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
        Выйти ({me?.username})
      </span>
    </div>
  );
};

export default Sidebar;

import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Loading from "src/components/Loader";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import UsersFilter from "./filter";
import Header from "src/components/Header";

import { TextSize } from "src/components/Typography";
import Button from "src/components/Button";
import useUsers from "src/hooks/useUsers";
import useQueryString from "src/hooks/useQueryString";
import { MainPermissions, UserType } from "src/utils/types";
import useToken from "src/hooks/useToken";
import Pagination from "src/components/Pagination";

interface Props {
  client?: boolean;
  edit: MainPermissions;
  add: MainPermissions;
}

const column = [
  { name: "№", key: "" },
  { name: "ФИО", key: "full_name" },
  { name: "Логин", key: "username" },
  { name: "Роль", key: "group.name" },
  { name: "Телефон", key: "phone_number" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Users: FC<Props> = ({ client, edit, add }) => {
  const update = useQueryString("update");
  const { data } = useToken({});
  const perms = data?.permissions;
  const [sort, $sort] = useState<UserType[]>();
  const page = Number(useQueryString("page")) || 1;

  const {
    data: users,
    refetch,
    isLoading,
  } = useUsers({ page, ...(!!client && { is_client: Number(client) }) });

  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  if (isLoading) return <Loading absolute />;

  return (
    <>
      <UsersFilter />
      <Header title={"Пользователи"}>
        {!client && perms?.[add] && (
          <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={handleNavigate("add")}
          >
            Создать
          </Button>
        )}
      </Header>
      <Card>
        <table>
          <TableHead
            onSort={(data) => $sort(data)}
            column={column}
            data={users?.items}
          />

          <tbody>
            {(sort?.length ? sort : users?.items)?.map((user, idx) => (
              <tr className="bg-blue hover:bg-gray-200 py-2" key={idx}>
                <td width="40" className="first:pl-3 py-3">
                  {idx + 1}
                </td>
                <td>{user?.full_name}</td>
                <td>
                  <span className="not-set">{user?.username}</span>
                </td>
                <td width={250}>
                  <Link to={`/roles/permission/${user.role_id}`}>
                    {user?.user_role?.name}
                  </Link>
                </td>
                <td>{user?.phone_number}</td>
                <td>{!!user?.status ? "Активный" : "Неактивный"}</td>
                <td width={40}>
                  {perms?.[edit] && (
                    <TableViewBtn onClick={handleNavigate(`${user?.id}`)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!!users?.pages && (
          <Pagination className="my-4" totalPages={users.pages} />
        )}
      </Card>
    </>
  );
};

export default Users;

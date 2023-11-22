import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "src/components/Card";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useSphereUsers from "src/hooks/useSphereUsers";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import { SphereUsers as SphereUsersTypes } from "src/utils/types";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "Очередь", key: "sequence" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const SphereUsers = () => {
  const { sphere_id } = useParams();
  const navigate = useNavigate();
  const [sort, $sort] = useState<SphereUsersTypes[]>();
  const update = useQueryString("update");

  const name = useQueryString("name");

  const {
    data: users,
    refetch,
    isLoading,
  } = useSphereUsers({ sphere_id: Number(sphere_id) });

  const handleNavigate = (url: string) => navigate(url);

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  return (
    <>
      <Header title={`Пользователи сферы(${name})`}>
        <div className="flex gap-3">
          {/* {perms?.[MainPermissions.filling] && ( */}
          <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => handleNavigate("add")}
          >
            Добавить
          </Button>
          {/* )} */}
        </div>
      </Header>
      <Card className="mt-1">
        <div className="content">
          <div className="table-responsive grid-view">
            {/* <ItemsCount data={categories} /> */}
            <table className="table table-hover">
              <TableHead
                onSort={(data) => $sort(data)}
                column={column}
                data={users}
              />

              {!!users?.length && (
                <tbody>
                  {(sort?.length ? sort : users)?.map((user, idx) => (
                    <tr key={idx} className="bg-blue">
                      <td className="first:pl-3 py-3" width="40">
                        {idx + 1}
                      </td>
                      <td>
                        <Link to={`/users/${user.id}`}>
                          {user?.sp_user?.full_name}
                        </Link>
                      </td>
                      <td className="pl-4">{user.sequence}</td>
                      <td>{!!user?.status ? "Активный" : "Неактивный"}</td>
                      <td width={40}>
                        {/* {perms?.[MainPermissions.filling] && ( */}
                        <TableViewBtn
                          onClick={() => handleNavigate(`${user.id}`)}
                        />
                        {/* )} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {/* {isLoading && <Loading />} */}
            {!users?.length && !isLoading && <EmptyList />}
          </div>
        </div>
      </Card>
    </>
  );
};

export default SphereUsers;

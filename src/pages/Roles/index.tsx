import Card from "src/components/Card";
import Header from "src/components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useRoles from "src/hooks/useRoles";
import { MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";
import Container from "src/components/Container";
import EmptyList from "src/components/EmptyList";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "", key: "" },
];

const Roles = () => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);
  const { data } = useToken({});
  const perms = data?.permissions;

  const { data: roles, isLoading } = useRoles({});

  const [sortKey, setSortKey] = useState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortData = () => {
    if (roles && sortKey) {
      const sortedData = [...roles].sort((a, b) => {
        if (a[sortKey]! < b[sortKey]!) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey]! > b[sortKey]!) return sortOrder === "asc" ? 1 : -1;
        else return 0;
      });
      return sortedData;
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, []);

  // if (isLoading) return <Loading absolute />;

  return (
    <Container>
      <Header title="Роли">
        {perms?.[MainPermissions.filling] && (
          <Button
            className="bg-yellow"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => navigate("add")}
          >
            Создать
          </Button>
        )}
      </Header>
      <Card className="mt-1">
        <div className="table-responsive grid-view content">
          <table className="table table-hover">
            <TableHead
              column={column}
              sort={handleSort}
              sortKey={sortKey}
              sortOrder={sortOrder}
            />

            {!!roles?.length && (
              <tbody>
                {(sortData()?.length ? sortData() : roles)?.map((role, idx) => (
                  <tr className="border-b-mainGray border-b-2" key={role.id}>
                    <td className="pl-3 py-4" width="40">
                      {idx + 1}
                    </td>
                    <td>
                      <Link to={`/roles/${role.id}`}>{role.name}</Link>
                    </td>
                    <td width={40}>
                      {perms?.[MainPermissions.filling] && (
                        <TableViewBtn
                          onClick={handleNavigate(`edit/${role.id}`)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!roles?.length && !isLoading && <EmptyList />}
        </div>
      </Card>
    </Container>
  );
};

export default Roles;

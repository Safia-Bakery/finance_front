import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useSpheres from "src/hooks/useSpheres";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import useToken from "src/hooks/useToken";
import Container from "src/components/Container";
import { MainPermissions } from "src/utils/types";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "Назначенный руководитель", key: "status" },
  { name: "Статус", key: "" },
  { name: "", key: "" },
];

const Spheres = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const update = useQueryString("update");
  const { data } = useToken({});
  const perms = data?.permissions;

  const { data: categories, refetch, isLoading } = useSpheres({});

  const handleNavigate = (url: string) => navigate(url);

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  return (
    <Container>
      {/* <CategoriesFilter /> */}
      <Header title="Сферы">
        <div className="flex gap-3">
          {/* {perms?.[MainPermissions.filling] && ( */}
          <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => handleNavigate("add")}
          >
            Создать
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
                column={column}
                sort={handleSort}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />

              {!!categories?.length && (
                <tbody>
                  {categories?.map((category, idx) => (
                    <tr key={idx} className="bg-blue">
                      <td className="first:pl-3 py-3" width="40">
                        {idx + 1}
                      </td>
                      <td>
                        <Link
                          to={`/sphere-users/${category.id}?name=${category.name}`}
                        >
                          {category?.name}
                        </Link>
                      </td>
                      <td>{"category?.name"}</td>
                      <td>{!!category?.status ? "Активный" : "Неактивный"}</td>
                      <td width={40}>
                        {perms?.[MainPermissions.filling] && (
                          <TableViewBtn
                            onClick={() => handleNavigate(`${category.id}`)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {/* {isLoading && <Loading />} */}
            {!categories?.length && !isLoading && <EmptyList />}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Spheres;

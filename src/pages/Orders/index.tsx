import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import EmptyList from "src/components/EmptyList";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";

import useOrders from "src/hooks/useOrders";
import { priceNum } from "src/utils/helpers";

const column = [
  { name: "№ Заявки", key: "" },
  { name: "Сфера", key: "id" },
  { name: "Руководитель", key: "type" },
  { name: "Дата поступления", key: "fillial.name" },
  { name: "Сумма", key: "category.name" },
  { name: "Срочно", key: "" },
  { name: "Статус", key: "" },
];

const Orders = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState();
  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  const { refetch: orderRefetch, data: orders, isLoading } = useOrders({});

  const handleNavigate = () => {
    navigate("/orders/add");
  };

  return (
    <Container>
      <Header title="Все заявки">
        <Button onClick={handleNavigate} className="bg-primary">
          Новая заявка
        </Button>
      </Header>

      <Card>
        <table>
          <TableHead
            column={column}
            sort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          <tbody className="px-2 py-1">
            {!!orders?.items?.length &&
              orders?.items.map((item) => (
                <tr className="py-1" key={item.id}>
                  <td className="py-3 pl-3">{item.id}</td>
                  <td>{item?.order_sp?.name}</td>
                  <td>Гафуржанов Шахзод</td>
                  <td>{dayjs(item?.created_at).format("DD.MM.YYYY HH:mm")}</td>
                  <td>{priceNum(+item?.price)} сум</td>
                  <td>{item.is_urgent ? "Да" : "Нет"}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {isLoading && <Loading className="py-4" />}
        {!isLoading && !orders?.items?.length && <EmptyList />}

        {!!orders?.pages && (
          <Pagination className="my-4" totalPages={orders.pages} />
        )}
      </Card>
    </Container>
  );
};

export default Orders;

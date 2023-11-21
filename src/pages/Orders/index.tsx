import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import EmptyList from "src/components/EmptyList";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import dayjs from "dayjs";
import useOrders from "src/hooks/useOrders";
import { mockOrder as orders, priceNum } from "src/utils/helpers";
import { Order } from "src/utils/types";

const column = [
  { name: "№ Заявки", key: "" },
  { name: "Сфера", key: "sphere" },
  { name: "Руководитель", key: "type" },
  { name: "Дата поступления", key: "created_at" },
  { name: "Сумма", key: "price" },
  { name: "Срочно", key: "urgent" },
  { name: "Статус", key: "status" },
];

const Orders = () => {
  const navigate = useNavigate();
  const { refetch: orderRefetch, isLoading } = useOrders({});
  const [sort, $sort] = useState<Order[]>();

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
        <div className="overflow-x-auto">
          <table>
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              data={orders?.items}
            />
            <tbody className="px-2 py-1">
              {!!orders?.items?.length &&
                (sort?.length ? sort : orders?.items).map((item) => (
                  <tr className="py-1" key={item.id}>
                    <td className="py-3 pl-3">
                      <Link to={`${item?.id}`}>{item.id}</Link>
                    </td>
                    <td>{item?.order_sp?.name}</td>
                    <td>Гафуржанов Шахзод</td>
                    <td>
                      {dayjs(item?.created_at).format("DD.MM.YYYY HH:mm")}
                    </td>
                    <td>{priceNum(+item?.price)} сум</td>
                    <td>{item.is_urgent ? "Да" : "Нет"}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* {isLoading && <Loading className="py-4" />}
        {!isLoading && !orders?.items?.length && <EmptyList />} */}

        {!!orders?.pages && (
          <Pagination className="my-4" totalPages={orders.pages} />
        )}
      </Card>
    </Container>
  );
};

export default Orders;

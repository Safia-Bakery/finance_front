import { useState } from "react";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import useOrders from "src/hooks/useOrders";
import EmptyList from "src/components/EmptyList";
import Loading from "src/components/Loader";
import { priceNum } from "src/utils/helpers";
import dayjs from "dayjs";
import { Order } from "src/utils/types";

const column = [
  { name: "№ Заявки", key: "" },
  { name: "Сфера", key: "id" },
  { name: "Руководитель", key: "type" },
  { name: "Дата поступления", key: "fillial.name" },
  { name: "Сумма", key: "category.name" },
  { name: "Срочно", key: "" },
  { name: "Статус (Мусажон)", key: "" },
  { name: "Статус (Руководитель)", key: "" },
];

const PurchasingDepartment = () => {
  const [sort, $sort] = useState<Order[]>();
  const { data: orders, refetch, isLoading } = useOrders({});

  return (
    <Container>
      <Header title="Все заявки">
        <Button className="bg-primary">Новая заявка</Button>
      </Header>

      <Card>
        <div className="overflow-x-auto">
          <table>
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              data={orders?.items}
            />
            {!!orders?.items.length && (
              <tbody className="px-2 py-1">
                {orders?.items.map((item, idx) => (
                  <tr className="py-1">
                    <td>{item.id}</td>
                    <td>{item.sphere_id}</td>
                    <td>Гафуржанов Шахзод</td>
                    <td>{dayjs(item.created_at).format("DD.MM.YYYY HH:mm")}</td>
                    <td>{priceNum(+item?.price)} сум</td>
                    <td>{item.is_urgent ? "Да" : "Нет"}</td>
                    <td>Ожидает согласования</td>
                    <td>Ожидает согласования</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {isLoading && <Loading className=" py-4" />}
        {!orders?.items.length && !isLoading && <EmptyList />}

        {!!orders?.pages && (
          <Pagination className="my-4" totalPages={orders?.pages} />
        )}
      </Card>
    </Container>
  );
};

export default PurchasingDepartment;

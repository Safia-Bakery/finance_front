import { useState } from "react";
import Card from "src/components/Card";
import Container from "src/components/Container";
import EmptyList from "src/components/EmptyList";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Typography from "src/components/Typography";
import useOrders from "src/hooks/useOrders";
import { priceNum } from "src/utils/helpers";
import dayjs from "dayjs";
const column = [
  { name: "№ Заявки", key: "" },
  { name: "Сфера", key: "id" },
  { name: "Руководитель", key: "type" },
  { name: "Дата поступления", key: "fillial.name" },
  { name: "Сумма", key: "category.name" },
  { name: "Срочно", key: "" },
  { name: "Статус (Мусажон)", key: "" },
  { name: "Статус (Руководитель)", key: "" },
  { name: "Финансовый отдел", key: "" },
];

const Accounting = () => {
  const [sort, $sort] = useState<Order[]>();
  const { data: orders, refetch, isLoading } = useOrders({});

  return (
    <>
      <Header title="Все заявки"></Header>

      <Card>
        <div className=" overflow-x-auto">
          <table>
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              data={orders?.items}
            />
            <tbody className="px-2 py-1">
              {(sort?.length ? sort : orders?.items)?.map((item, idx) => (
                <tr className="py-1 text-center " key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.sphere_id}</td>
                  <td>Гафуржанов Шахзод</td>
                  <td>{dayjs(item.created_at).format("DD.MM.YYYY HH:mm")}</td>
                  <td>{priceNum(+item?.price)} сум</td>
                  <td>{item.is_urgent ? "Да" : "Нет"}</td>
                  <td>
                    <div className="flex items-center justify-center gap-1 w-max">
                      <Typography>Согласовано</Typography>
                      <span>
                        <img src="assets/icons/right-green.svg" alt="+" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <Typography>Согласовано</Typography>
                      <span>
                        <img src="assets/icons/right-green.svg" alt="+" />
                      </span>
                    </div>
                  </td>
                  <td>Подтверждён</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isLoading && <Loading className=" py-4" />}
        {!orders?.items.length && !isLoading && <EmptyList />}

        {!!orders?.pages && (
          <Pagination className="my-4" totalPages={orders?.pages} />
        )}
      </Card>
    </>
  );
};

export default Accounting;

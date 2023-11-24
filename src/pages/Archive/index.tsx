import { useState } from "react";
import Card from "src/components/Card";
import Container from "src/components/Container";
import EmptyList from "src/components/EmptyList";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Typography, { TextSize } from "src/components/Typography";
import useOrders from "src/hooks/useOrders";
import { priceNum } from "src/utils/helpers";
import dayjs from "dayjs";

const column = [
  { name: "№ Заявки", key: "" },
  { name: "Сфера", key: "id" },
  { name: "Заказщик", key: "type" },
  { name: "Дата поступления", key: "fillial.name" },
  { name: "Сумма", key: "category.name" },
  { name: " Тип оплаты", key: "" },
  { name: "Срочно", key: "" },
  { name: "Статус (Мусажон)", key: "" },
  { name: "Статус (Руководитель)", key: "" },
  { name: "Руководитель", key: "" },
  { name: "Финансовый отдел", key: "" },
  { name: "Бухгалтерия", key: "" },
];

const Archive = () => {
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

  const { data: orders, refetch, isLoading } = useOrders({});

  return (
    <Container>
      <Header title="Все заявки"></Header>

      <Card>
        <div className="overflow-x-auto">
          <table>
            <TableHead
              column={column}
              sort={handleSort}
              sortKey={sortKey}
              sortOrder={sortOrder}
            />

            <tbody className="px-2 py-1 bg-[#B9EFCD] ">
              {orders?.items.map((item, idx) => (
                <tr className="py-1 text-center   ">
                  <td>{item.id}</td>
                  <td>{item.sphere_id}</td>
                  <td>{item.order_py.name}</td>
                  <td>{dayjs(item.created_at).format("DD.MM.YYYY HH:mm")}</td>
                  <td>{priceNum(+item?.price)} сум</td>
                  <td>Перечисление</td>
                  <td>{item.is_urgent ? "Да" : "Нет"}</td>
                  <td>
                    <div className="flex items-center gap-1 justify-center w-max">
                      <Typography size={TextSize.L}>Согласовано</Typography>
                      <span>
                        <img src="/assets/icons/right-green.svg" alt="right" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 justify-center">
                      <Typography size={TextSize.L}>Согласовано</Typography>
                      <span>
                        <img src="/assets/icons/right-green.svg" alt="right" />
                      </span>
                    </div>
                  </td>
                  <td>Гафуржанов Шахзод</td>
                  <td className="">
                    <div className="flex items-center gap-1 justify-center  w-max">
                      <Typography size={TextSize.L}>Подтвердждён</Typography>
                      <span>
                        <img src="/assets/icons/right-blue.svg" alt="right" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 justify-center">
                      <Typography size={TextSize.L}>Оплачен</Typography>
                      <span>
                        <img src="/assets/icons/right-blue.svg" alt="right" />
                      </span>
                    </div>
                  </td>
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
    </Container>
  );
};

export default Archive;

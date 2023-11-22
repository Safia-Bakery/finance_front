import { useState } from "react";
import Card from "src/components/Card";
import Header from "src/components/Header";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Typography from "src/components/Typography";
import useOrders from "src/hooks/useOrders";
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
  { name: "Финансовый отдел", key: "" },
];

const FinanceDepartment = () => {
  const [sort, $sort] = useState<Order[]>();
  const { data: orders, refetch, isLoading } = useOrders({});

  return (
    <>
      <Header title="Все заявки" />

      <Card>
        <div className=" overflow-x-auto">
          <table>
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              data={orders?.items}
            />

            <tbody className="px-2 py-1">
              {(sort?.length ? sort : orders?.items)?.map((item) => (
                <tr className="py-1 text-center " key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.sphere_id}</td>
                  <td>Гафуржанов Шахзод</td>
                  <td>{dayjs(item.created_at).format("DD.MM.YYYY HH:mm")}</td>
                  <td>{item.price}</td>
                  <td>{item.is_urgent}</td>
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
                  <td>Не задано</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination className="my-4" totalPages={2} />
      </Card>
    </>
  );
};

export default FinanceDepartment;

import { useState } from "react";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Typography, { TextSize } from "src/components/Typography";
import { Order } from "src/utils/types";

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
  const [sort, $sort] = useState<Order[]>();

  return (
    <Container>
      <Header title="Все заявки"></Header>

      <Card>
        <div className="overflow-x-auto">
          <table>
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              // data={orders?.items}
            />

            <tbody className="px-2 py-1 bg-[#B9EFCD] ">
              <tr className="py-1 text-center   ">
                {/* (sort?.length ? sort : orders?.items) */}
                <td>100091</td>
                <td>Фабрика</td>
                <td>Махмуд</td>
                <td>01.10.2023</td>
                <td>14 000 000 сум</td>
                <td>Перечисление</td>
                <td>Да</td>
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
            </tbody>
          </table>
        </div>

        <Pagination className="my-4" totalPages={2} />
      </Card>
    </Container>
  );
};

export default Archive;

import { useMemo, useState } from "react";
import BaseInput from "src/components/BaseInputs";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import TableHead from "src/components/TableHead";
import Typography, { TextSize } from "src/components/Typography";

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

  return (
    <Container>
      <Header title="Все заявки">
        <Button className="bg-primary">Новая заявка</Button>
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
            <tr className="py-1">
              <td>100091</td>
              <td>Фабрика</td>
              <td>Гафуржанов Шахзод</td>
              <td>01.10.2023</td>
              <td>14 000 000 сум</td>
              <td>Да</td>
              <td>Создан</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Container>
  );
};

export default Orders;

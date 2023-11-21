import { useState } from "react";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Typography from "src/components/Typography";
import { priceNum } from "src/utils/helpers";

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
      <Header title="Все заявки"></Header>

      <Card>
        <table>
          <TableHead
            column={column}
            sort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          <tbody className="px-2 py-1">
            <tr className="py-1 text-center ">
              <td>100091</td>
              <td>Фабрика</td>
              <td>Гафуржанов Шахзод</td>
              <td>01.10.2023</td>
              <td>{priceNum(14000000)}сум</td>
              <td>Да</td>
              <td>
                <div className="flex items-center justify-center gap-1">
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
          </tbody>
        </table>

        <Pagination className="my-4" totalPages={2} />
      </Card>
    </Container>
  );
};

export default Accounting;

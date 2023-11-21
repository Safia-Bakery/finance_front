import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";

const column = [
  { name: "№", key: "" },
  { name: "Действие", key: "id" },
  { name: "Сотрудник", key: "type" },
  { name: "Дата ", key: "fillial.name" },
  { name: "Минут", key: "category.name" },
];

const Logs = () => {
  return (
    <Container>
      <Header title="Логи">
        <Button className="bg-blue-500">Назад</Button>
      </Header>

      <Card>
        <table className="">
          <TableHead column={column} />

          <tbody className="px-2 py-1 ">
            <tr className="py-1 ">
              <td>1</td>
              <td>Поступление заявки</td>
              <td> Шахзод</td>
              <td>01.10.2023</td>
              <td>14 000 000</td>
            </tr>
            <tr className="py-1 ">
              <td>2</td>
              <td>Назначение</td>
              <td> Шахзод</td>
              <td>01.10.2023</td>
              <td>14 000 000</td>
            </tr>
            <tr className="py-1 ">
              <td>3</td>
              <td>Отмена</td>
              <td> Шахзод</td>
              <td>01.10.2023</td>
              <td>14 000 000</td>
            </tr>
            <tr className="py-1 ">
              <td>4</td>
              <td>Завершение</td>
              <td> Шахзод</td>
              <td>01.10.2023</td>
              <td>14 000 000</td>
            </tr>
          </tbody>
        </table>

        <Pagination className="my-4" totalPages={2} />
      </Card>
    </Container>
  );
};

export default Logs;

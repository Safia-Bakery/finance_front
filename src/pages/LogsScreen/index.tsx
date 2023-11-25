import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import TableHead from "src/components/TableHead";
import useHistory from "src/hooks/useHistory";

const column = [
  { name: "№", key: "" },
  { name: "Действие", key: "id" },
  { name: "Сотрудник", key: "type" },
  { name: "Дата ", key: "fillial.name" },
  { name: "Минут", key: "category.name" },
];

const Logs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useHistory({ order_id: id, enabled: !!id });

  console.log(data, "data");
  return (
    <Container>
      <Header title="Логи">
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-500"
          textClassName="text-white"
        >
          Назад
        </Button>
      </Header>

      <Card>
        <table className="">
          <TableHead column={column} />

          <tbody className="px-2 py-1 ">
            {data?.map((item, idx) => (
              <tr className="py-1 ">
                <td className="!py-3 !pl-3">{idx + 1}</td>
                <td>Поступление заявки</td>
                <td>{item?.hi_user?.full_name}</td>
                <td>{dayjs(item?.created_at).format("DD.MM.YYYY HH:mm")}</td>
                <td>14 000 000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Container>
  );
};

export default Logs;

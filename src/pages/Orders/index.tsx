import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import useOrders from "src/hooks/useOrders";
import { priceNum } from "src/utils/helpers";
import { Order } from "src/utils/types";
import EmptyList from "src/components/EmptyList";
import Approved from "src/components/Approved";
import { useAppSelector } from "src/store/utils/types";
import { sortedUsers } from "src/store/reducers/sorter";
import dayjs from "dayjs";
import Typography from "src/components/Typography";

const Orders = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const sphereUsers = useAppSelector(sortedUsers);
  const [sort, $sort] = useState<Order[]>();

  const { isLoading, data: orders } = useOrders({ user_id });

  const handleNavigate = () => {
    navigate("/orders/add");
  };

  const column = useMemo(() => {
    const init = [
      { name: "№ Заявки", key: "" },
      { name: "Сфера", key: "sphere" },
      { name: "Руководитель", key: "type" },
      { name: "Дата поступления", key: "created_at" },
      { name: "Сумма", key: "price" },
      { name: "Срочно", key: "urgent" },
    ];

    const sphere = sphereUsers?.map((user) => {
      return {
        name: `Статус (${user?.sp_user?.full_name})`,
        key: user?.id?.toString(),
      };
    });

    if (!!sphere?.length) return init.concat(sphere);
    else return init;
  }, [sphereUsers]);

  if (isLoading) return <Loading absolute />;

  return (
    <Container>
      <Header title="Все заявки">
        <Button
          onClick={handleNavigate}
          className="bg-primary"
          textClassName="text-white"
        >
          Новая заявка
        </Button>
      </Header>

      <Card>
        <div className="overflow-x-auto">
          <table className="centered bordered">
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              data={orders?.items}
            />
            <tbody className="px-2 py-1 ">
              {!!orders?.items?.length &&
                (sort?.length ? sort : orders?.items).map((item) => (
                  <tr className="py-1" key={item.id}>
                    <td className="!py-3 pl-3">
                      <Link to={`/orders/${item?.id}`}>{item.id}</Link>
                    </td>
                    <td>{item?.order_sp?.name}</td>
                    <td>{item?.order_sp?.sphereuser?.[0]?.name}</td>
                    <td>
                      {dayjs(item?.created_at).format("DD.MM.YYYY HH:mm")}
                    </td>
                    <td>{priceNum(+item?.price)} сум</td>
                    <td>{item.is_urgent ? "Да" : "Нет"}</td>
                    {/* <td>{item.status}</td> */}
                    {sphereUsers.map((user, idx) => {
                      return (
                        <td key={user.id}>
                          {item?.order_hi?.map((hist) => {
                            if (user.user_id === hist.user_id && !!hist.status)
                              return (
                                // <td key={hist.id}>
                                <Approved />
                                // </td>
                              );
                            if (user.user_id === hist.user_id)
                              return (
                                <Typography>Ожидает согласования</Typography>
                              );
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!orders?.items.length && !isLoading && <EmptyList />}

        {!!orders?.pages && (
          <Pagination className="my-4" totalPages={orders?.pages} />
        )}
      </Card>
    </Container>
  );
};

export default Orders;

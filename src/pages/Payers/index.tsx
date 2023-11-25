import Card from "src/components/Card";
import Header from "src/components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import usePayers from "src/hooks/usePayers";
import { MainPermissions, PayersType } from "src/utils/types";
import useToken from "src/hooks/useToken";
import EmptyList from "src/components/EmptyList";
import Loading from "src/components/Loader";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "", key: "" },
];

const Payers = () => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);
  const { data } = useToken({});
  const perms = data?.permissions;

  const { data: payers, isLoading } = usePayers({});
  const [sort, $sort] = useState<PayersType[]>();

  if (isLoading) return <Loading absolute />;

  return (
    <>
      <Header title="Плательщики">
        {perms?.[MainPermissions.payers] && (
          <Button
            className="bg-yellow"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => navigate("add")}
          >
            Создать
          </Button>
        )}
      </Header>
      <Card className="mt-1">
        <div className="table-responsive grid-view content">
          <table className="table table-hover">
            <TableHead
              onSort={(data) => $sort(data)}
              column={column}
              data={payers}
            />

            {!!payers?.length && (
              <tbody>
                {(sort?.length ? sort : payers)?.map((payer, idx) => (
                  <tr className="border-b-mainGray border-b-2" key={payer.id}>
                    <td className="pl-3 py-4" width="40">
                      {idx + 1}
                    </td>
                    <td>{payer.name}</td>
                    <td width={40}>
                      {perms?.[MainPermissions.edit_payers] && (
                        <TableViewBtn onClick={handleNavigate(`${payer.id}`)} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!payers?.length && !isLoading && <EmptyList />}
        </div>
      </Card>
    </>
  );
};

export default Payers;

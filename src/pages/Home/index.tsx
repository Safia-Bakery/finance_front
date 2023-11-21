import Typography, { TextSize, Weight } from "src/components/Typography";
import styles from "./index.module.scss";
import useToken from "src/hooks/useToken";
import Card from "src/components/Card";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { useState } from "react";
import cl from "classnames";

const currencyVals = [
  {
    id: 1,
    name: "USD",
  },
  {
    id: 2,
    name: "rubl",
  },
];

const Home = () => {
  const { data: user } = useToken({ enabled: false });
  const [currency, $currency] = useState(1);

  return (
    <div className="pr-2">
      <div className={cl(styles.top, "!shadow")}>
        <div className="header text-center">
          <Typography size={TextSize.XL}>
            Добро пожаловать {user?.full_name}
          </Typography>
          <p className={styles.category}>{user?.role?.toString()}Admin</p>
        </div>
      </div>
      <Card className="bg-[#F8F9FA] !w-auto h-screen m-2">
        <div className="w-[1200px] ml-4">
          <Typography size={TextSize.L} weight={Weight.bold} alignCenter>
            КУРС ВАЛЮТ
          </Typography>
          <div className="flex mt-3 gap-3">
            <div className="border border-gray-200 rounded ">
              <table className="w-[700px] ">
                <thead>
                  <tr className="border-b-darkBlue border-b-2">
                    <th className="uppercase text-darkBlue font-normal text-start  p-4">
                      currency
                    </th>
                    <th className="uppercase text-darkBlue font-normal text-start  p-4">
                      buying
                    </th>
                    <th className="uppercase text-darkBlue font-normal text-start  p-4">
                      selling
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[...Array(4)].map((item, idx) => (
                    <tr
                      className="bg-blue text-black border-b border-b-gray-200 last:border-b-0"
                      key={idx}
                    >
                      <td className=" font-bold p-4">dollars</td>
                      <td className=" font-bold p-4">12600.00</td>
                      <td className=" font-bold p-4">12600.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-white rounded w-[250px] shadow h-min">
              <Typography size={TextSize.L} weight={Weight.bold}>
                Converter
              </Typography>

              <div className="">
                <div className="flex gap-2">
                  <MainInput
                    type="number"
                    className="flex flex-2 shadow p-1 border rounded text-black w-24 "
                  />
                  <MainSelect
                    className="flex-1 flex p-1 shadow text-black border rounded w-16"
                    noDefault
                    onChange={(e) => $currency(+e.target.value)}
                    values={currencyVals}
                  />
                </div>
                <div className="bg-[#ECECEC] rounded p-2 flex justify-between">
                  <Typography>12000.00</Typography>
                  <Typography>UZS</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

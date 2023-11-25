import Typography, { TextSize, Weight } from "src/components/Typography";
import styles from "./index.module.scss";
import useToken from "src/hooks/useToken";
import Card from "src/components/Card";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { useMemo, useState } from "react";
import cl from "classnames";
import useConversion from "src/hooks/useConversion";
import { CurrencyTypes } from "src/utils/types";
import useUpdateEffect from "src/hooks/useUpdateEffect";
import useDebounce from "src/hooks/useDebounce";
import { priceNum } from "src/utils/helpers";

const Home = () => {
  const { data: user } = useToken({ enabled: false });
  const [amount, $amount] = useDebounce(0);
  const { data } = useConversion({});

  const filteredCurrencies = useMemo(() => {
    if (data) {
      const filterByIds = (
        ids: number[],
        data: CurrencyTypes[]
      ): CurrencyTypes[] => {
        const idSet = new Set(ids);
        return data.filter((currency) => idSet.has(currency.id));
      };
      return filterByIds([69, 21, 57, 22, 33, 14, 38], data);
    }
  }, [data]);

  const [currency, $currency] = useState<number | undefined>();
  useUpdateEffect(() => {
    if (filteredCurrencies) $currency(Number(filteredCurrencies?.[0].Rate));
  }, [filteredCurrencies]);
  const renderCalculation = useMemo(() => {
    return (
      <div>
        <div className="flex gap-2">
          <MainInput
            type="number"
            onChange={(e) => $amount(+e.target.value)}
            className="flex flex-2 shadow p-1 border rounded text-black w-min "
          />
          <MainSelect
            className="flex-1 flex p-1 shadow text-black border rounded w-min"
            onChange={(e) => $currency(+e.target.value)}
          >
            {filteredCurrencies?.map((item) => (
              <option key={item.id} value={item.Rate}>
                {item.Ccy}
              </option>
            ))}
          </MainSelect>
        </div>
        <div className="bg-[#ECECEC] rounded p-2 flex justify-between">
          <Typography>
            {currency && amount ? priceNum(currency * amount) : 0}
          </Typography>
          <Typography>UZS</Typography>
        </div>
      </div>
    );
  }, [currency, amount, filteredCurrencies]);

  console.log(currency, "currency");

  return (
    <div className="pr-2">
      <div className={cl(styles.top, "!shadow")}>
        <div className="header text-center">
          <Typography size={TextSize.XL}>
            Добро пожаловать {user?.user?.full_name}
          </Typography>
          <p className={styles.category}>{user?.user?.user_role?.name}Admin</p>
        </div>
      </div>
      <Card className="bg-[#F8F9FA] !w-auto h-screen m-2">
        <div className="ml-4">
          <Typography size={TextSize.L} weight={Weight.bold} alignCenter>
            КУРС ВАЛЮТ
          </Typography>
          <div className="flex mt-3 gap-3">
            <div className="border border-gray-200 rounded ">
              <table className="w-[700px] ">
                <thead>
                  <tr className="border-b-darkBlue border-b-2">
                    <th className="uppercase text-darkBlue font-normal text-start p-4">
                      НАИМЕНОВАНИЕ ВАЛЮТЫ
                    </th>
                    <th className="uppercase text-darkBlue font-normal text-start p-4">
                      ПОКУПКА
                    </th>
                    <th className="uppercase text-darkBlue font-normal text-start p-4">
                      ПРОДАЖА
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCurrencies?.map((item, idx) => (
                    <tr
                      className="bg-blue text-black border-b border-b-gray-200 last:border-b-0"
                      key={idx}
                    >
                      <td className="font-bold p-4">{item.CcyNm_RU}</td>
                      <td className="font-bold p-4">{item.Rate}</td>
                      <td className="font-bold p-4">
                        {+item.Rate + +item.Diff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-white rounded w-[250px] shadow h-min">
              <Typography size={TextSize.L} weight={Weight.bold}>
                Converter
              </Typography>

              {renderCalculation}

              {/* <div className="">
                <div className="flex gap-2">
                  <MainInput
                    type="number"
                    className="flex flex-2 shadow p-1 border rounded text-black w-min "
                  />
                  <MainSelect
                    className="flex-1 flex p-1 shadow text-black border rounded w-min"
                    noDefault
                    onChange={(e) => $currency(+e.target.value)}
                    values={currencyVals}
                  />
                </div>
                <div className="bg-[#ECECEC] rounded p-2 flex justify-between">
                  <Typography>12000.00</Typography>
                  <Typography>UZS</Typography>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

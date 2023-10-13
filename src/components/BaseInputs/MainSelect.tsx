import { ChangeEvent, FC, ReactNode } from "react";
import cl from "classnames";
import styles from "./index.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  onChange?: (val: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string | number;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  values?: { id: number | string; name: string; status?: number }[];
  children?: ReactNode;
  onFocus?: () => void;
  noDefault?: boolean;
}

const MainSelect: FC<Props> = ({
  className,
  register,
  values,
  children,
  onFocus,
  noDefault,
  ...others
}) => {
  return (
    <select
      className={cl(className, styles.inputBox, "mb-2")}
      onFocus={onFocus}
      {...others}
      {...register}
    >
      {!children ? (
        <>
          {!noDefault && <option value={undefined}></option>}
          {values?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </>
      ) : (
        children
      )}
    </select>
  );
};

export default MainSelect;

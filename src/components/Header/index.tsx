import { FC, PropsWithChildren } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  title?: string;
  subTitle?: string;
}

console.log(window.innerWidth, "width");

const Header: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div
      className={
        "flex justify-between p-4 bg-white rounded-t-xl rounded-b-[2px] items-center"
      }
    >
      <Typography size={TextSize.XL}>{title}</Typography>
      {/* {subTitle && <p className="mb-0">{subTitle}</p>} */}

      <div className="">{children}</div>
    </div>
  );
};

export default Header;

import cl from "classnames";
import { FC, PropsWithChildren } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  className?: string;
  title?: string;
}

const Card: FC<Props> = ({ children, className, title }) => {
  return (
    <>
      <div
        className={cl(
          "bg-white rounded-bl-xl rounded-br-xl rounded-tl rounded-tr w-full m-2 shadow pb-4 ",
          className
        )}
      >
        <div className="flex justify-between ">
          {title && (
            <Typography className="flex" size={TextSize.XXL}>
              {title}
            </Typography>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Card;

import cl from "classnames";
import { FC, PropsWithChildren } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  className?: string;
  title?: string;
}

const Card: FC<Props> = ({ children, className, title }) => {
  return (
    <div
      className={cl(
        "bg-white rounded-b-xl rounded-t-[2px] w-full mt-2 p-2 h-full overflow-y-auto",
        className
      )}
    >
      <div className="flex justify-between">
        {title && (
          <Typography className="flex" size={TextSize.XXL}>
            {title}
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;

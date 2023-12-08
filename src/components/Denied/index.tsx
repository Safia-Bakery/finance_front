import Typography from "../Typography";

const Denied = () => {
  return (
    <div className="flex items-center justify-center gap-1 w-max">
      <Typography>Отказан</Typography>
      <span>
        <img
          src="/assets/icons/denied.svg"
          alt="denied"
          height={15}
          width={15}
        />
      </span>
    </div>
  );
};

export default Denied;

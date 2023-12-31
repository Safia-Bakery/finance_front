import Typography from "../Typography";

const Approved = () => {
  return (
    <div className="flex items-center justify-center gap-1 w-max">
      <Typography>Согласовано</Typography>
      <span>
        <img
          src="/assets/icons/right-green.svg"
          alt="approved"
          height={15}
          width={15}
        />
      </span>
    </div>
  );
};

export default Approved;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import payerMutation from "src/hooks/mutation/payer";
import usePayers from "src/hooks/usePayers";
import { errorToast, successToast } from "src/utils/toast";

const EditAddPayers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues } = useForm();

  const { refetch: payerRefetch, data } = usePayers({
    enabled: !!id,
    id: Number(id),
  });

  const { refetch } = usePayers({ enabled: false });
  const { mutate: postRole } = payerMutation();
  const payer = data?.[0];

  const onSubmit = () => {
    const { name, status } = getValues();
    postRole(
      { name, status: Number(status), id: Number(id) },
      {
        onSuccess: () => {
          if (id) payerRefetch();
          refetch();
          successToast(!id ? "payer created" : "payer updated");
          navigate("/payers");
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (id && payer?.name) {
      reset({
        name: payer.name,
      });
    }
  }, [payer?.name, id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography size={TextSize.XXL} className="flex my-4 ml-1">
        Добавить
      </Typography>
      <Card className="px-8 py-4">
        <div className="flex flex-1 gap-4 flex-col">
          <BaseInput label="НАЗВАНИЕ" className="mt-4">
            <MainInput
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 w-64 text-black" type="submit">
            {!!id ? "Изменить" : "Создать"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditAddPayers;

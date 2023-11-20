import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import sphereMutation from "src/hooks/mutation/sphere";
import useSpheres from "src/hooks/useSpheres";

const EditAddSphere: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const { data, refetch } = useSpheres({
    ...(!!id && { id: Number(id) }),
    enabled: !!id,
  });
  const { mutate, isLoading: mutateLoading } = sphereMutation();

  const onSubmit = () => {
    const { name, status } = getValues();
    mutate(
      {
        name,
        status: Number(status),
        ...(!!id && { id: Number(id) }),
      },
      {
        onSuccess: () => {
          refetch();
          navigate("/spheres?update=1");
        },
      }
    );
  };

  useEffect(() => {
    if (id && data?.length) {
      reset({
        name: data[0].name,
        status: !!data[0].status,
      });
    }
  }, [id, data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography size={TextSize.XXL} className="flex my-4 ml-1">
        Добавить
      </Typography>
      <Card className="px-8 py-4">
        <div className="flex flex-1 gap-4 flex-col">
          <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
            <MainInput
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>

          {/* <BaseInput label="ЗАГРУЗИТЬ ФОТО" className="relative">
            <MainInput />
            <MainInput
              type="file"
              register={register("image", { required: "Обязательное поле" })}
              className="opacity-0 absolute right-0 bottom-0"
            />
          </BaseInput> */}

          {!!id && (
            <BaseInput label="СТАТУС">
              <MainCheckBox label="Активный" register={register("status")} />
            </BaseInput>
          )}
        </div>
        <div className="flex flex-1 justify-end">
          <Button
            className="bg-darkYellow mt-4 w-64"
            isLoading={mutateLoading}
            type="submit"
          >
            Создать
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditAddSphere;

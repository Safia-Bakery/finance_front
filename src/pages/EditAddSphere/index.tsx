import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
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
    <>
      <Header title={!id ? "Добавить" : "Изменить"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="px-8 py-4">
          <div className="flex flex-1 gap-4 flex-col">
            <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
              <MainInput
                register={register("name", { required: "Обязательное поле" })}
              />
            </BaseInput>

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
              {!!id ? "Изменить" : "Создать"}
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

export default EditAddSphere;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import Typography, { TextSize } from "src/components/Typography";
import roleMutation from "src/hooks/mutation/roleMutation";
import useRoles from "src/hooks/useRoles";
import { errorToast, successToast } from "src/utils/toast";

const EditAddRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues } = useForm();

  const { refetch: roleRefetch, data } = useRoles({
    enabled: !!id,
    id: Number(id),
  });

  const { refetch } = useRoles({ enabled: false });
  const { mutate: postRole, isLoading } = roleMutation();
  const role = data?.[0];

  const onSubmit = () => {
    postRole(
      { name: getValues("name"), role_id: Number(id) },
      {
        onSuccess: (data: any) => {
          successToast(!id ? "role created" : "role updated");
          navigate(!id ? `/permission/${data.id}` : "/roles");
          refetch();
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (id && role?.name) {
      reset({
        name: role.name,
      });
    }
  }, [role?.name, id]);

  return (
    <>
      <Header title={!id ? "Добавить" : "Изменить"} />

      <Card className="px-8 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-1 gap-4 flex-col">
            <BaseInput label="НАЗВАНИЕ" className="mt-4">
              <MainInput
                register={register("name", { required: "Обязательное поле" })}
              />
            </BaseInput>
          </div>
          <div className="flex flex-1 justify-end">
            <Button
              isLoading={isLoading}
              className="bg-darkYellow mt-4 w-64 text-black"
              type="submit"
            >
              {!!id ? "Изменить" : "Создать"}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default EditAddRole;

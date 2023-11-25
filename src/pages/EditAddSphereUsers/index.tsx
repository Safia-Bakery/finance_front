import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import { errorToast, successToast } from "src/utils/toast";
import sphereUsersMutation from "src/hooks/mutation/sphereUsers";
import MainSelect from "src/components/BaseInputs/MainSelect";
import useUsers from "src/hooks/useUsers";
import Loading from "src/components/Loader";
import useSphereUsers from "src/hooks/useSphereUsers";
import useSpheres from "src/hooks/useSpheres";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import useQueryString from "src/hooks/useQueryString";
import Header from "src/components/Header";
import Container from "src/components/Container";

const EditAddSphereUsers = () => {
  const { sphere_id, user_id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues } = useForm();
  const { mutate } = sphereUsersMutation();

  const { data: users, isFetching: userLoading } = useUsers({
    enabled: !!sphere_id,
  });
  const {
    isFetching: sphereLoading,
    refetch,
    data: sphere,
  } = useSphereUsers({
    enabled: !!sphere_id,
    sphere_id: +sphere_id!,
  });
  const { data: spheres, isFetching: sphereLoding } = useSpheres({
    enabled: !!user_id,
  });

  const { data: sphereUser, isFetching: sphereUserLoading } = useSphereUsers({
    enabled: !!user_id,
    id: Number(user_id),
  });

  const user = sphereUser?.[0];

  const onSubmit = () => {
    const { user, status, sequence, sphere, head } = getValues();
    mutate(
      {
        sphere_id: user_id ? sphere : sphere_id,
        user_id: Number(user),
        status: Number(status),
        sequence: Number(sequence),
        id: Number(user_id),
        name: head,
      },
      {
        onSuccess: () => {
          refetch();
          successToast(!sphere_id ? "role created" : "role updated");
          navigate(-1);
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (user_id) {
      reset({
        user: user?.user_id,
        sphere: user?.sphere_id,
        status: user?.status,
        sequence: user?.sequence,
        head: user?.name,
      });
    }
  }, [user, sphere_id]);

  if (userLoading || sphereLoading || sphereLoding || sphereUserLoading)
    return <Loading absolute />;

  return (
    <Container>
      <Header title="Добавить" />

      <Card className="px-8 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-1 gap-4 flex-col">
            {!sphere?.length && (
              <BaseInput label="Руководитель отдела" className="mt-2">
                <MainInput register={register("head")} />
              </BaseInput>
            )}
            <BaseInput label="Пользователь" className="mt-4">
              <MainSelect
                disabled={!!user_id}
                register={register("user", { required: "Обязательное поле" })}
              >
                <option value={undefined}></option>
                {users?.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item?.full_name}
                  </option>
                ))}
              </MainSelect>
            </BaseInput>
            {!!user_id && (
              <BaseInput label="Сфера" className="mt-4">
                <MainSelect
                  register={register("sphere", {
                    required: "Обязательное поле",
                  })}
                >
                  <option value={undefined}></option>
                  {spheres?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </MainSelect>
              </BaseInput>
            )}
            <BaseInput label="Очередь" className="mt-2">
              <MainInput
                type="number"
                register={register("sequence", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput className="mt-2">
              <MainCheckBox register={register("status")} label={"Статус"} />
            </BaseInput>
          </div>
          <div className="flex flex-1 justify-end">
            <Button
              className="bg-darkYellow mt-4 w-64 text-black"
              type="submit"
            >
              {!!sphere_id ? "Изменить" : "Создать"}
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default EditAddSphereUsers;

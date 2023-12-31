import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import { errorToast, successToast } from "src/utils/toast";
import sphereUsersMutation from "src/hooks/mutation/sphereUsers";
import MainSelect from "src/components/BaseInputs/MainSelect";
import useUsers from "src/hooks/useUsers";
import Loading from "src/components/Loader";
import useSphereUsers from "src/hooks/useSphereUsers";
import useSpheres from "src/hooks/useSpheres";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import Header from "src/components/Header";
import Container from "src/components/Container";
import userMutation from "src/hooks/mutation/user";

const EditAddSphereUsers = () => {
  const { sphere_id, user_id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues } = useForm();
  const { mutate, isLoading: mutateLoading } = sphereUsersMutation();
  const { mutate: mutateUser, isLoading: userLoadingMutation } = userMutation();

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

  const {
    data: sphereUser,
    isFetching: sphereUserLoading,
    refetch: userRefetch,
  } = useSphereUsers({
    enabled: !!user_id,
    id: Number(user_id),
  });

  const user = sphereUser?.[0];

  const onSubmit = () => {
    const { user: user_in, status, sequence, sphere, head, show } = getValues();
    if (user?.user_id && user_id)
      mutateUser({ id: user?.user_id, show: Number(show) });
    mutate(
      {
        sphere_id: user_id ? sphere : sphere_id,
        user_id: Number(user_in),
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
          if (user_id) userRefetch();
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (user_id && user) {
      reset({
        user: user?.user_id,
        sphere: user?.sphere_id,
        status: user?.status,
        sequence: user?.sequence,
        head: user?.name,
        show: user?.sp_user?.show,
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
            {(!sphere?.length || user?.sequence === 1) && (
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
            <BaseInput className="mt-2">
              <MainCheckBox
                register={register("show")}
                label={"Показать на сайдбаре"}
              />
            </BaseInput>
          </div>
          <div className="flex flex-1 justify-end">
            <Button
              isLoading={mutateLoading || userLoadingMutation}
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

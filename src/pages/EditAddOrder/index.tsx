import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import Button from "src/components/Button";
import Card from "src/components/Card";
import EmptyList from "src/components/EmptyList";
import UploadComponent, { FileItem } from "src/components/FileUpload";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import OrderDenyModal from "src/components/OrderDenyModal";
import Typography, { TextSize } from "src/components/Typography";
import orderMutation from "src/hooks/mutation/order";
import orderStatusMutation from "src/hooks/mutation/orderStatus";
import { useNavigateParams } from "src/hooks/useCustomNavigate";
import useOrders from "src/hooks/useOrders";
import usePayers from "src/hooks/usePayers";
import useSpheres from "src/hooks/useSpheres";
import { PaymentTypes } from "src/utils/helpers";
import { successToast } from "src/utils/toast";
import { OrderStatus } from "src/utils/types";

const EditAddOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCateg, $activeCateg] = useState<number>();
  const [files, $files] = useState<FormData>();
  const { register, getValues, handleSubmit, reset } = useForm();
  const { refetch: orderRefetch } = useOrders({ enabled: false });
  const navigateParams = useNavigateParams();

  const { mutate: orderStatus } = orderStatusMutation();

  const { mutate } = orderMutation();
  const { data, isFetching: orderLoading } = useOrders({
    id,
    enabled: !!id,
  });
  const order = data?.items?.[0];
  useEffect(() => {
    if (order) {
      $activeCateg(order.sphere_id);
      reset({
        is_urgent: order.is_urgent,
        purchaser: order.purchaser,
        product: order.title,
        price: order.price,
        payment_type: order.payment_type,
        payer: order.payer_id,
        supplier: order.supplier,
        comment: order.comment,
      });
    }
  }, [order]);

  const { data: payers, isFetching: payersLoading } = usePayers({});
  const { data: spheres, isFetching: sphereLoading } = useSpheres({});

  const handleFilesSelected = (data: FileItem[]) => {
    const formData = new FormData();
    data.forEach((item) => {
      formData.append("files", item.file, item.file.name);
    });
    $files(formData);
  };

  const onSubmit = () => {
    if (!activeCateg) alert("Выберите сферу");
    const {
      purchaser,
      product,
      price,
      payment_type,
      payer,
      supplier,
      comment,
      is_urgent,
    } = getValues();

    if (id) {
      orderStatus(
        {
          id: +id,
          // comment: "",
          status: OrderStatus.accept,
        },
        {
          onSuccess: () => {
            orderRefetch();
            navigate("/orders/all");
            successToast("created");
          },
        }
      );
    } else {
      mutate(
        {
          purchaser,
          title: product,
          price,
          payment_type,
          payer_id: payer,
          supplier,
          comment,
          sphere_id: activeCateg!,
          files: [],
          is_urgent: Number(is_urgent),
        },
        {
          onSuccess: () => {
            orderRefetch();
            navigate("/orders/all");
            successToast("created");
          },
        }
      );
    }
  };

  const renderCategs = useMemo(() => {
    return (
      <div className="w-full flex items-center h-full relative flex-wrap max-w-[70%]">
        {!!spheres?.length && !sphereLoading && (
          <BaseInput
            className={
              "flex w-full gap-10 bg-lightGray p-3 rounded-md flex-1 overflow-x-auto flex-wrap "
            }
          >
            {spheres?.map((item, idx) => {
              return (
                <label
                  onClick={() => $activeCateg(item.id)}
                  key={idx}
                  className="flex gap-2"
                >
                  <input
                    disabled={!!id}
                    type="radio"
                    onChange={() => null}
                    checked={item.id === activeCateg}
                  />
                  {item.name}
                </label>
              );
            })}
          </BaseInput>
        )}
        {!spheres?.length && !sphereLoading && (
          <EmptyList title="Категории не найдены" />
        )}

        {sphereLoading && <Loading />}
      </div>
    );
  }, [activeCateg, spheres, sphereLoading]);

  if (sphereLoading || orderLoading || payersLoading)
    return <Loading absolute />;

  return (
    <>
      <Header title={id ? `Заявка №100091` : "Новая заявка"}>
        <Button className="bg-[#F69B30] w-24" textClassName="text-white">
          Логи
        </Button>
      </Header>
      <Card className="md:flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography size={TextSize.XXL}>Сфера</Typography>
          <div className="flex justify-between items-center my-4">
            {renderCategs}
            <BaseInput>
              <MainCheckBox
                register={register("is_urgent")}
                disabled={!!id}
                inputStyle={InputStyle.white}
                label={"Срочно"}
              />
            </BaseInput>
          </div>
          <div className="flex flex-wrap flex-[4] gap-7 mb-7">
            <BaseInput className="flex flex-col flex-1" label="Заказчик">
              <MainInput register={register("purchaser")} disabled={!!id} />
            </BaseInput>
            <BaseInput
              className="flex flex-col flex-[2]"
              label="Название товара"
            >
              <MainInput register={register("product")} disabled={!!id} />
            </BaseInput>
            <BaseInput className="flex flex-col flex-1" label="Цена">
              <MainInput
                type="number"
                register={register("price")}
                disabled={!!id}
              />
            </BaseInput>
          </div>
          <div className="flex flex-wrap flex-[4] gap-4">
            <BaseInput className="flex flex-col flex-1" label="Тип оплаты">
              <MainSelect
                values={PaymentTypes}
                disabled={!!id}
                register={register("payment_type")}
              />
            </BaseInput>
            <BaseInput className="flex flex-col flex-[2]" label="Плательщик">
              <MainSelect
                values={payers}
                register={register("payer")}
                disabled={!!id}
              />
            </BaseInput>
            <BaseInput className="flex flex-col flex-1" label="Поставщик">
              <MainInput register={register("supplier")} disabled={!!id} />
            </BaseInput>
          </div>
          <div className="flex justify-between mt-6">
            <BaseInput label="Добавить фото" className="relative w-1/3">
              <UploadComponent
                disabled={!!id}
                onFilesSelected={handleFilesSelected}
              />
            </BaseInput>

            <BaseInput className="w-1/2" label="Комментарии">
              <MainTextArea register={register("comment")} disabled={!!id} />
            </BaseInput>
          </div>
          {/* <div className="flex w-full justify-end my-20">
            <Button className="bg-green w-24 shadow-button" type="submit">
              Отправить на согласование
            </Button>
          </div> */}
          <div className="flex w-full justify-end my-20">
            <div className="w-max flex gap-3">
              <Button className="bg-green w-24 shadow-button" type="submit">
                Отправить на согласование
              </Button>
              <Button
                textClassName="text-white"
                className="bg-red-400 w-24 shadow-button"
                onClick={() => navigateParams({ modal: 1 })}
              >
                Отменить
              </Button>
            </div>
          </div>
        </form>

        <OrderDenyModal />
      </Card>
    </>
  );
};

export default EditAddOrder;

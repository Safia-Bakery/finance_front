import { ChangeEvent, useEffect, useMemo, useState } from "react";
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
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import OrderDenyModal from "src/components/OrderDenyModal";
import Typography, { TextSize } from "src/components/Typography";
import imageUploadMutation from "src/hooks/mutation/imageUpload";
import orderMutation from "src/hooks/mutation/order";
import orderStatusMutation from "src/hooks/mutation/orderStatus";
import { useNavigateParams } from "src/hooks/useCustomNavigate";
import useOrders from "src/hooks/useOrders";
import usePayers from "src/hooks/usePayers";
import useSpheres from "src/hooks/useSpheres";
import { baseURL } from "src/main";
import { PaymentTypes } from "src/utils/helpers";
import { successToast } from "src/utils/toast";
import { OrderStatus } from "src/utils/types";

const EditAddOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCateg, $activeCateg] = useState<number>();
  const [files, $files] = useState<string[]>();
  const { register, getValues, handleSubmit, reset } = useForm();
  const { refetch: orderRefetch } = useOrders({ enabled: false });
  const navigateParams = useNavigateParams();

  const { mutate: orderStatus, isLoading: statusLoading } =
    orderStatusMutation();
  const { mutate, isLoading: mutateLoaidng } = orderMutation();
  const { data, isFetching: orderLoading } = useOrders({
    id,
    enabled: !!id,
  });
  const order = data?.items?.[0];

  const { data: payers, isFetching: payersLoading } = usePayers({});
  const { data: spheres, isFetching: sphereLoading } = useSpheres({});
  const { mutate: uploadImage, isLoading: imageLoading } =
    imageUploadMutation();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileData = new FormData();
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        fileData.append("image", files[i]);
      }

      uploadImage(fileData, {
        onSuccess: (data: any) => {
          $files(data.images);
        },
      });
    }
  };

  const onSubmit = () => {
    if (!activeCateg) alert("Выберите сферу");

    if (!!id) {
      orderStatus(
        {
          id: +id,
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
          files,
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

  const renderImages = useMemo(() => {
    return (
      <div className="w-1/3">
        <BaseInput label="Добавить фото" className="relative w-full">
          <div className="bg-white border border-mainGray rounded-md relative h-7 overflow-hidden">
            <div className="bg-lightGray h-7 w-1/2 border border-r-mainGray pl-2">
              <Typography size={TextSize.S} className="text-[#9F9FA0]">
                Выбрать файл
              </Typography>
            </div>
            <input
              className="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
              id="fileUploader"
              type="file"
              multiple
              onChange={handleUploadImage}
            />
          </div>
        </BaseInput>

        <div className="gap-2 flex mt-2">
          {files?.map((item, idx) => (
            <div className="relative" key={idx}>
              <img
                src={`${baseURL}/${item}`}
                className="max-h-12 object-contain h-full"
                alt={`image-${idx}`}
              />
              <div
                className="absolute top-1 right-1 border border-black rounded-full"
                // onClick={() => handleFileDelete(item.id)}
              >
                <img src="/assets/icons/clear.svg" alt="delete" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [files]);

  useEffect(() => {
    if (order && id) {
      $activeCateg(order.sphere_id);
      $files(order?.files);
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

  if (sphereLoading || orderLoading || payersLoading)
    return <Loading absolute />;

  return (
    <>
      <Header title={id ? `Заявка ${id}` : "Новая заявка"}>
        {!!id && (
          <Button
            onClick={() => navigate(`/logs/${id}`)}
            className="bg-[#F69B30] w-24"
            textClassName="text-white"
          >
            Логи
          </Button>
        )}
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
            {renderImages}
            <BaseInput className="w-1/2" label="Комментарии">
              <MainTextArea register={register("comment")} disabled={!!id} />
            </BaseInput>
          </div>
          <div className="flex w-full justify-end my-20">
            <div className="w-max flex gap-3">
              <Button
                className="bg-green w-24 shadow-button"
                type="submit"
                isLoading={mutateLoaidng || statusLoading}
              >
                {!id ? "Создать" : "Согласовать"}
              </Button>
              {!!id && (
                <Button
                  textClassName="text-white"
                  className="bg-red-400 w-24 shadow-button"
                  onClick={() => navigateParams({ modal: 1 })}
                >
                  Отменить
                </Button>
              )}
            </div>
          </div>
        </form>

        <OrderDenyModal />
      </Card>
    </>
  );
};

export default EditAddOrder;

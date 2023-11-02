import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Container from "src/components/Container";
import UploadComponent, { FileItem } from "src/components/FileUpload";
import Header from "src/components/Header";
import Typography, { TextSize } from "src/components/Typography";

const AddOrder = () => {
  const { id } = useParams();
  const [activeCateg, $activeCateg] = useState();
  const [files, $files] = useState<FormData>();
  const { register } = useForm();

  const categories: any[] = [];
  const categoryLoading = false;

  const handleFilesSelected = (data: FileItem[]) => {
    const formData = new FormData();
    data.forEach((item) => {
      formData.append("files", item.file, item.file.name);
    });
    $files(formData);
  };

  const renderCategs = useMemo(() => {
    return (
      <div className=" mt-4">
        <Typography size={TextSize.XXL}>Сфера</Typography>
        <div className="w-full mt-4 flex items-center h-full relative">
          {!!categories?.length && !categoryLoading && (
            <BaseInput
              className={
                "flex w-full gap-10 bg-mainGray p-3 rounded-md flex-1 overflow-x-auto flex-wrap "
              }
            >
              {categories?.map((item, idx) => {
                return (
                  <label
                    onClick={() => $activeCateg(item.id)}
                    key={idx}
                    className="flex gap-2"
                  >
                    <input
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
          {/* {!categories?.length && !categoryLoading && (
              <EmptyList title="Категории не найдены" />
            )}
  
            {categoryLoading && <Loading />} */}
        </div>
      </div>
    );
  }, [activeCateg, categories, categoryLoading]);
  return (
    <Container>
      <Header title={id ? `Заявка №100091` : "Новая заявка"}>
        <Button className="bg-[#F69B30] w-24">Логи</Button>
      </Header>
      <Card className="md: flex flex-col">
        <div className="flex justify-between items-center">
          {renderCategs}
          <BaseInput>
            <MainCheckBox inputStyle={InputStyle.white} label={"Срочно"} />
          </BaseInput>
        </div>
        <div className="flex flex-wrap flex-[4] gap-7 mb-7">
          <BaseInput className="flex flex-col flex-1" label="Заказчик">
            <MainInput register={register("name")} />
          </BaseInput>
          <BaseInput className="flex flex-col flex-[2]" label="Название товара">
            <MainInput register={register("product")} />
          </BaseInput>
          <BaseInput className="flex flex-col flex-1" label="Цена">
            <MainInput register={register("product")} />
          </BaseInput>
        </div>
        <div className="flex flex-wrap flex-[4] gap-4">
          <BaseInput className="flex flex-col flex-1" label="Тип оплаты">
            <MainInput register={register("product")} />
          </BaseInput>
          <BaseInput className="flex flex-col flex-[2]" label="Плательщик">
            <MainInput register={register("product")} />
          </BaseInput>
          <BaseInput className="flex flex-col flex-1" label="Поставщик">
            <MainInput register={register("product")} />
          </BaseInput>
        </div>
        <div className="flex justify-between mt-6">
          <BaseInput label="Добавить фото" className="relative w-1/3">
            <UploadComponent onFilesSelected={handleFilesSelected} />
          </BaseInput>

          <BaseInput className="w-1/2" label="Комментарии">
            <MainTextArea register={register("comments")} />
          </BaseInput>
        </div>
        <div className="flex w-full justify-end my-20">
          <Button className="bg-green w-24 shadow-button">
            Отправить на согласование
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default AddOrder;

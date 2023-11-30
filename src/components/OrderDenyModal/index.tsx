import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import CloseIcon from "src/components/CloseIcon";
import Modal from "src/components/Modal";
import Typography, { TextSize } from "src/components/Typography";
import { useRemoveParams } from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { successToast } from "src/utils/toast";
import { OrderStatus } from "src/utils/types";
import Button from "src/components/Button";
import orderStatusMutation from "src/hooks/mutation/orderStatus";
import useOrders from "src/hooks/useOrders";

const OrderDenyModal = () => {
  const { id } = useParams();
  const { mutate } = orderStatusMutation();
  const modal = Number(useQueryString("modal"));
  const removeParams = useRemoveParams();
  const { register, getValues } = useForm();
  const { refetch } = useOrders({ id, enabled: false });

  const closeModal = () => removeParams(["modal"]);

  const handleStatus = (status: OrderStatus) => {
    mutate(
      { status, id: Number(id), comment: getValues("cancel_reason") },
      {
        onSuccess: () => {
          successToast("status changed");
          refetch();
          if (modal) closeModal();
        },
      }
    );
  };

  return (
    <Modal isOpen={!!modal} onClose={closeModal}>
      <form className="p-3 h-full">
        <div className="flex w-full justify-between items-center">
          <Typography size={TextSize.XXL}>Причина отклонении</Typography>
          <CloseIcon onClick={closeModal} />
        </div>

        <div className="flex flex-col justify-between h-full">
          <BaseInput label="Комментарии" className="mt-4">
            <MainTextArea register={register("cancel_reason")} />
          </BaseInput>

          <Button
            className="bg-primary text-white absolute bottom-2 w-[initial]"
            onClick={() => handleStatus(OrderStatus.deny)}
            textClassName="text-white"
          >
            Отправить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderDenyModal;

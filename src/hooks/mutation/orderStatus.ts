import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  id: number;
  comment?: string;
  status: number;
}

const orderStatusMutation = () => {
  return useMutation(["order_status"], async (body: Body) => {
    const { data } = await apiClient.put({ url: "/v1/history", body });
    return data;
  });
};
export default orderStatusMutation;

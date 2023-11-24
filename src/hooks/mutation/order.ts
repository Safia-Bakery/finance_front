import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  title: string;
  price: number;
  payment_type: number;
  supplier: string;
  sphere_id: number;
  payer_id: number;
  files?: string[];
  purchaser: string;
  is_urgent: number;
  comment: string;
  id?: number;
  status?: number;
}

const orderMutation = () => {
  return useMutation(["order_handling"], async (body: Body) => {
    if (body.id) {
      const { data } = await apiClient.put({ url: "/v1/orders", body });
      return data;
    } else {
      const { data } = await apiClient.post({
        url: "/v1/orders",
        body,
      });
      return data;
    }
  });
};
export default orderMutation;

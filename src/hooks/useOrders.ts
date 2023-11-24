import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { OrdersTypes } from "src/utils/types";

interface Params {
  enabled?: boolean;
  size?: number;
  page?: number;
  status?: number;
  created_at?: string;
  sphere?: string;
  id?: number | string;
  user_id?: string | number;
}

export const useOrders = ({
  enabled = true,
  size,
  page,
  status,
  created_at,
  sphere,
  id,
  user_id,
}: Params) => {
  return useQuery({
    queryKey: ["get_orders", page, status, created_at, sphere, id, user_id],
    queryFn: () =>
      apiClient
        .get({
          url: "/v1/orders",
          params: {
            page,
            size,
            status,
            created_at,
            sphere,
            id,
            user_id,
          },
        })
        .then(({ data: response }) => (response as OrdersTypes) || null),
    enabled,
  });
};
export default useOrders;

import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { HistoryTypes } from "src/utils/types";

interface Props {
  enabled?: boolean;
  order_id?: number | string;
}

export const useHistory = ({ enabled = true, order_id }: Props) => {
  return useQuery({
    queryKey: ["history", order_id],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/history", params: { order_id } })
        .then(({ data: response }) => response as HistoryTypes[]),
    enabled,
    refetchOnMount: true,
  });
};
export default useHistory;

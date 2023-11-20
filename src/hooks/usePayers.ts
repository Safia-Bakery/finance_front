import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { PayersType } from "src/utils/types";

export const usePayers = ({
  enabled = true,
  id,
  name,
  status,
}: {
  enabled?: boolean;
  id?: number;
  name?: string;
  status?: number;
}) => {
  return useQuery({
    queryKey: ["payers", id, name, status],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/payers", params: { id, name, status } })
        .then(({ data: response }) => response as PayersType[]),
    enabled,
    refetchOnMount: true,
  });
};
export default usePayers;

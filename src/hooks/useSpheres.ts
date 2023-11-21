import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { SphereTypes } from "src/utils/types";

export const useSpheres = ({
  enabled = true,
  name,
  id,
  status,
  price,
}: {
  enabled?: boolean;
  name?: string;
  id?: number;
  status?: number;
  price?: number;
}) => {
  return useQuery({
    queryKey: ["categories", name, id, status, price],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/spheres", params: { name, id, status, price } })
        .then(({ data: response }) => {
          return response as SphereTypes[];
        }),
    enabled,
    refetchOnMount: true,
  });
};
export default useSpheres;

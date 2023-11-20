import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { SphereUsers } from "src/utils/types";

interface Params {
  enabled?: boolean;
  name?: string;
  id?: number;
  status?: number;
  sphere_id?: number;
  user_id?: number;
  sequence?: number;
}

export const useSphereUsers = ({
  enabled = true,
  name,
  id,
  status,
  sphere_id,
  user_id,
  sequence,
}: Params) => {
  return useQuery({
    queryKey: ["sphere_users", name, id, status, sphere_id, user_id, sequence],
    queryFn: () =>
      apiClient
        .get({
          url: "/v1/spheres/users",
          params: { name, id, status, sphere_id, user_id, sequence },
        })
        .then(({ data: response }) => {
          return response as SphereUsers[];
        }),
    enabled,
    refetchOnMount: true,
  });
};
export default useSphereUsers;

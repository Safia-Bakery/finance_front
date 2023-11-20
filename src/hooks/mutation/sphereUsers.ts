import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  user_id?: number;
  sphere_id: number;
  status?: number;
  sequence: number;

  id?: number;
}

const sphereUsersMutation = () => {
  return useMutation(["handle_sphere_users"], async (body: Body) => {
    if (!body.id) {
      const { data } = await apiClient.post({ url: "/v1/spheres/users", body });
      return data;
    } else {
      const { data } = await apiClient.put({ url: "/v1/spheres/users", body });
      return data;
    }
  });
};
export default sphereUsersMutation;

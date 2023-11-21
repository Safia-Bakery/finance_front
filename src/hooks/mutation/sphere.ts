import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  name: string;
  status?: number;
  id?: number;
}

const sphereMutation = () => {
  return useMutation(["handle_category"], async (body: Body) => {
    if (!body.id) {
      const { data } = await apiClient.post({ url: "/v1/spheres", body });
      return data;
    } else {
      const { data } = await apiClient.put({ url: "/v1/spheres", body });
      return data;
    }
  });
};
export default sphereMutation;

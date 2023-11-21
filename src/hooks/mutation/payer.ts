import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

const payerMutation = () => {
  return useMutation(
    ["post_role"],
    async (body: { name?: string; id?: number; status?: number }) => {
      if (body.id) {
        const { data } = await apiClient.put({ url: "/v1/payers", body });
        return data;
      } else {
        const { data: data_1 } = await apiClient.post({
          url: "/v1/payers",
          body,
        });
        return data_1;
      }
    }
  );
};
export default payerMutation;

import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

const imageUploadMutation = () => {
  const contentType = "multipart/form-data";
  return useMutation(["image_upload"], (body: FormData) =>
    apiClient
      .post({ url: "/v1/image/upload", body, contentType })
      .then(({ data }) => data)
      .catch((e) => errorToast(e.message))
  );
};
export default imageUploadMutation;

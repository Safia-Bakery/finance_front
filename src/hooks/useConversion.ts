import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CurrencyTypes } from "src/utils/types";

export const useConversion = ({ enabled = true }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: () =>
      axios
        .get("https://cbu.uz/uz/arkhiv-kursov-valyut/json/")
        .then(({ data: response }) => response as CurrencyTypes[]),
    enabled,
    refetchOnMount: true,
  });
};
export default useConversion;

//https://cbu.uz/uz/arkhiv-kursov-valyut/json/

import { QueryClient } from "@tanstack/react-query";
import { EPresetTimes, Order } from "./types";

export const itemsPerPage = 50;

export const StatusName = [
  { name: "Активный", id: 1 },
  { name: "Не активный", id: 0 },
];
export const priceNum = (val: number) => {
  return val
    ?.toFixed(2)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const orderStatus = (order: Order) => {
  if (order.status === 2) return "bg-red-300";
  if (!order.order_hi[0].status) return "";
  else {
    switch (order.order_sp?.sphereuser?.length - order.order_hi?.length) {
      case 0:
        return !!order.order_hi.at(-1)?.status ? "bg-green-400" : "bg-yellow"; // when it is false remains last person to approve, else it is approved
      case 1: // remained 2 people
        return "bg-lightBlue";
      case 2: // remained 3 people
        return "bg-mainYellow";
      case 3: // remained 4 people
        return "bg-darkYellow";
      default:
        return "";
    }
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: EPresetTimes.MINUTE * 5,
      staleTime: EPresetTimes.MINUTE * 5,
    },
  },
});

export const isMobile = window.innerWidth <= 1200;

export const imageConverter = (img: File) => {
  if (img?.size) return URL.createObjectURL(img);
  return "";
};

export const PaymentTypes = [
  { id: 0, name: "Наличные" },
  { id: 1, name: "На карту" },
  { id: 2, name: "Перечисление" },
];

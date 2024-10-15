import { httpClient } from "@/api/axios";
import { API_END_POINT } from "@/constants/api";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";

export const usePostOrderId = (): { mutate: UseMutateFunction } => {
  const createOrderId = async () => {
    const response = await httpClient.post(`${API_END_POINT.CREATE_ORDERID}`);
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: createOrderId,
    onSuccess: (data) => {
      console.log("성공", data);
    }
  });

  return { mutate };
};
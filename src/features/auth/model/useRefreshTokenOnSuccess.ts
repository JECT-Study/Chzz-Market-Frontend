import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refreshToken } from "../api";
import { storeLogin } from "./authSlice";
import { useEffect } from "react";

export const useRefreshTokenOnSuccess = () => {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get('status');

  const { mutate, isSuccess } = useMutation({
    mutationFn: () => refreshToken(),
    onSuccess: () => {
      const newAccessToken = localStorage.getItem('accessToken');
      if (newAccessToken) {
        dispatch(storeLogin({ token: newAccessToken }));
      }
    },
  });

  useEffect(() => {
    if (status === 'success') {
      mutate();
    }
  }, [status, mutate]);

  return { isSuccess };
};
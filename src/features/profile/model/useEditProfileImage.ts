import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { postEditProfileImage } from "../api/postEditProfileImage";

export const useEditProfileImage = (): {
  profileImageMutate: UseMutateFunction<any, Error, string | undefined, unknown>;
} => {
  const { mutate:profileImageMutate } = useMutation({
    mutationFn: (url: string | undefined) => postEditProfileImage(url)
  });

  return { profileImageMutate };
};
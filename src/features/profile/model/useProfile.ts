import { IProfileData } from "@/entities/user/user";
import { QUERY_KEYS } from "@/shared";
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/getProfile";
import { postEditProfile } from "../api/postEditProfile";
import { nicknameCheck } from "@/features/auth/api";

export const useProfile = (): {
  profileData: IProfileData;
  profileMutation: UseMutateFunction<any, Error, FormData, unknown>;
  isPending: boolean;
  isLoading: boolean;
} => {
  const navigate = useNavigate();

  const { data: profileData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: () => getProfile(),
  });

  const { mutate: profileMutation, isPending } = useMutation({
    mutationFn: (formData: FormData) => postEditProfile(formData),
    onSuccess: () => {
      navigate('/user', { replace: true });
    },
  });

  return { profileData, profileMutation, isPending, isLoading };
};

export const useCheckNickname = ({
  nickname,
}: {
  nickname: string;
}): {
  checkNickname: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
} => {
  const { refetch: checkNickname } = useQuery({
    queryKey: [QUERY_KEYS.NICKNAME, nickname],
    queryFn: () => nicknameCheck(nickname),
    enabled: false,
  });

  return { checkNickname };
};

import { useProfile } from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const mockData = {
  nickname: '치즈',
  country: '서울',
};

const UserProfile = () => {
  const navigator = useNavigate();
  const { profileData } = useProfile();

  return (
    <div className="flex items-center pb-8 my-10 border-b border-b-gray3">
      <div className="w-20 h-20 rounded-full bg-gray-300 mr-4" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-bold mr-2 pr-2">
              {/* {profileData.nickname} */}
              {mockData.nickname}
            </p>
          </div>
          <button
            className="px-3 py-1 border border-gray2 rounded-md"
            onClick={() =>
              navigator('profile/edit', { state: { profileData } })
            }
          >
            수정
          </button>
        </div>
        <div className="mt-2">
          <div className="font-bold">자기소개</div>
          <div>
            {/* {profileData.bio} */}
            안녕하세요, 나이키 직영 조인 정품 취급 전문가 입니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

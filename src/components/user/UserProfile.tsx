import { useNavigate } from 'react-router-dom';
import ProfileImage from '@/assets/icons/profile.svg';

interface Props {
  nickname?: string;
  bio?: string;
  link?: string;
  profileImageUrl?: string;
  providerType?: string;
}

const UserProfile = ({ nickname, bio, link, profileImageUrl, providerType }: Props) => {
  const navigator = useNavigate();
  const userNickname = nickname || null;
  const userBio = bio || null;
  const userLink = link || null;
  const userProfileImageUrl = profileImageUrl || null;

  return (
    <div className="flex items-center pb-8 my-10 border-b border-b-gray3">
      {profileImageUrl ? (
        <img src={profileImageUrl} alt='프로필 이미지' className='w-20 h-20 rounded-full mr-4' />
      ) : (
        <img src={ProfileImage} alt='기본 프로필 이미지' className='w-20 h-20 rounded-full mr-4' />
      )} 
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-bold mr-2 pr-2">
              {userNickname}
            </p>
          </div>
          <button
            className="px-3 py-1 border border-gray2 rounded-md"
            onClick={() =>
              navigator('profile/edit', { state: { userNickname, userBio, userLink, userProfileImageUrl } })
            }
          >
            수정
          </button>
        </div>
        <div className="mt-2">
          <div className="font-bold">자기소개</div>
          <div>
            {userBio}
          </div>
        </div>
        {providerType === 'kakao' ? (<div>kakao</div>) : (<div>naver</div>)}
      </div>
    </div>
  );
};

export default UserProfile;

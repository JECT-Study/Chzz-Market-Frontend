import { useNavigate } from 'react-router-dom';
import ProfileImage from '@/assets/icons/profile.svg';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from "react-icons/ri";
import Button from '../common/Button';

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
    <div className="flex items-center pb-8 my-10 gap-5 border-b border-b-gray3">
      {profileImageUrl ? (
        <img src={profileImageUrl} alt='프로필 이미지' className='w-35 h-35 rounded-full mr-4' />
      ) : (
        <img src={ProfileImage} alt='기본 프로필 이미지' className='w-35 h-35 rounded-full mr-4' />
      )} 
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-2xl font-bold mr-2 pr-2">
              {userNickname}
            </p>
          </div>
          <Button
            type='button'
            size='medium'
            className="px-3 py-1 border border-gray2 rounded-md"
            onClick={() =>
              navigator('profile/edit', { state: { userNickname, userBio, userLink, userProfileImageUrl } })
            }
          >
            수정
          </Button>
        </div>
        {providerType === 'KAKAO' ? (
          <div className="w-52 h-9 flex items-center gap-3 bg-yellow-400 text-xl text-black py-1.5 px-5 my-1 rounded-full">
            <RiKakaoTalkFill size={24} />
            <span>카카오톡과 연결</span>
          </div>
        ) : (
          <div className="w-48 h-9 flex items-center gap-5 bg-green-500 text-xl text-white py-1.5 px-5 my-1 rounded-full">
            <SiNaver size={20} />
            <span className='items-center'>네이버와 연결</span>
          </div>
        )}
        <div className="mt-2">
          <div className="text-xl font-bold mb-2">자기소개</div>
          <div>
            {userBio}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

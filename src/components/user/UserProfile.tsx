import { useNavigate } from 'react-router-dom';

interface Props {
  nickname?: string;
  bio?: string;
  link?: string;
}

const UserProfile = ({ nickname, bio, link }: Props) => {
  const navigator = useNavigate();
  const userNickname = nickname || null;
  const userBio = bio || null;
  const userLink = link || null;

  return (
    <div className="flex items-center pb-8 my-10 border-b border-b-gray3">
      <div className="w-20 h-20 rounded-full bg-gray-300 mr-4" />
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
              navigator('profile/edit', { state: { userNickname, userBio, userLink } })
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
      </div>
    </div>
  );
};

export default UserProfile;

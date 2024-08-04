import { IoIosArrowForward } from 'react-icons/io';

const mypageList = [
  { id: 1, title: '모든 등록 내역' },
  {
    id: 2,
    title: '설정',
  },
  {
    id: 3,
    title: '로그아웃',
  },
];

const MyPageOrderList = () => {
  return (
    <div className="flex flex-col">
      {mypageList.map((item) => (
        <div
          key={item.id}
          className="w-full flex justify-between py-2 border-b-2 border-b-gray3"
        >
          <h2 className="text-lg font-medium">{item.title}</h2>
          <IoIosArrowForward className="text-2xl" />
        </div>
      ))}
    </div>
  );
};

export default MyPageOrderList;

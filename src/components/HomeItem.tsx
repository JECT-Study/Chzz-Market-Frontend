import { AiOutlineUsergroupDelete } from 'react-icons/ai';

function HomeItem() {
  return (
    <figure className="flex flex-col min-w-[9rem]">
      <div className="relative w-full h-full">
        <img src="/air-jordan-row.jpeg" alt="air-jordan-row" />
        <div className="absolute bottom-0 w-full py-1 text-sm text-center bg-slate-400">
          16시간 남음
        </div>
      </div>
      <figcaption className="flex flex-col items-start justify-start flex-1 w-full px-1 py-2 text-sm">
        <div className="text-gray-700">[나이키] 신발</div>
        <div className="font-semibold">10,000원 (시작가)</div>
        <div className="flex items-center text-gray-500">
          <AiOutlineUsergroupDelete />
          <span>11명 참여 중</span>
        </div>
      </figcaption>
    </figure>
  );
}

export default HomeItem;

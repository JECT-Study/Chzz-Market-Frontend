import React from 'react';
import Layout from '@/components/Layout';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ProgressBar from '@/components/detail/ProgressBar';
import { useProgress } from '@/hooks/useProgress';

const DetailPage: React.FC = () => {
  const totalTime = 24 * 60 * 60; // 24시간을 초로 변환
  const { formatTime, progressBarWidth } = useProgress(totalTime);

  return (
    <Layout>
      {/* 헤더 */}
      <header className="w-full flex items-center justify-between px-4 py-3 shadow-md">
        <button aria-label="뒤로 가기">
          <AiOutlineLeft size={24} />
        </button>
        <div />
        <button aria-label="옵션 열기">
          <BsThreeDotsVertical size={24} />
        </button>
      </header>

      <Layout.Main>
        {/* 상품 이미지 영역 */}
        <div className="w-full">
          <img
            src="/jordan-blue.png" // public 폴더의 이미지를 사용
            alt="Jordan Blue"
            className="w-full object-cover"
          />
        </div>

        {/* 타이머 및 프로그레스 바 */}
        <div className="text-center text-green-500 font-bold text-lg my-2">
          {formatTime()}
        </div>
        <ProgressBar progressBarWidth={progressBarWidth} />

        {/* 경매 정보 영역 */}
        <div className="w-full px-4">
          <div className="flex items-center mb-4">
            <div className="bg-gray-300 w-10 h-10 rounded-full" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">프로필 이름</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-bold text-lg">[나이키] 신발</p>
          </div>
          <div className="w-full mb-4">
            <div className="flex justify-around items-center border border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">시작가</p>
                <p className="font-bold text-lg">10,000,000원</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">나의 참여 금액</p>
                <p className="font-bold text-lg">참여 전</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">참여 인원</p>
                <p className="font-bold text-lg">55명</p>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 설명 */}
        <div className="px-4 mb-4 text-sm text-gray-700">
          <p>
            Air Jordan 1 Retro High OG는 마이클 조던(Michael Jordan)이 1985년
            NBA 농구 시즌에서 신은 초기 디자인을 재현한 스니커즈입니다. 이
            신발은 고급 품질의 가죽과 트라이플 스티치가 특징인 전통적인 형태를
            갖추고 있습니다.
          </p>
          <p>
            Air Jordan 1 Retro High OG는 마이클 조던(Michael Jordan)이 1985년
            NBA 농구 시즌에서 신은 초기 디자인을 재현한 스니커즈입니다.
          </p>
        </div>

        {/* 경매 참여 버튼 */}
        <button className="w-full bg-orange-500 text-white py-3 rounded-none">
          경매 참여하기
        </button>
      </Layout.Main>
    </Layout>
  );
};

export default DetailPage;

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ProgressBar from '@/components/detail/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { useNavigate } from 'react-router-dom';

const DetailPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalTime = 24 * 60 * 60; // 24시간을 초로 변환
  const auctionStartTime = 1627880400; // 예시: 서버로부터 전달받은 경매 시작 시간 (초 단위 타임스탬프)
  const serverCurrentTime = Math.floor(Date.now() / 1000); // 예시: 현재 서버 시간 (초 단위 타임스탬프)

  const { formatTime, progressBarWidth } = useProgress(
    auctionStartTime,
    serverCurrentTime,
    totalTime,
  );

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Layout>
      <Layout.Header handleBack={handleBackClick} handleModal={toggleMenu}>
        제품 상세
      </Layout.Header>

      <div className="relative flex-grow">
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

        <Layout.Footer>{/* 푸터 내용 넣는곳 */}</Layout.Footer>

        {/* 백드롭 */}
        {isMenuOpen && (
          <>
            <div
              className="absolute inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMenu}
              style={{ top: 0, bottom: 0 }}
            />

            {/* 메뉴 (아코디언) */}
            <div className="absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50">
              <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200">
                수정하기
              </button>
              <button className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-100">
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DetailPage;

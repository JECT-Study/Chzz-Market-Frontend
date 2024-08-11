import React from 'react';
import Layout from '@/components/Layout';

const DetailPage: React.FC = () => {
  const handleBack = () => {
    // 뒤로 가기 기능 구현
  };

  const handleModal = () => {
    // 모달 열기 기능 구현
  };

  return (
    <Layout>
      <Layout.Header handleBack={handleBack} handleModal={handleModal}>
        나이키 신발
      </Layout.Header>
      <Layout.Main>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* 이미지 영역 */}
          <div className="relative flex justify-center mb-4">
            <img
              src="/images/nike-shoe.jpg"
              alt="Nike Shoe"
              className="w-full max-w-xs"
            />
          </div>

          {/* 타이머 */}
          <div className="text-center text-green-500 font-bold text-lg mb-2">
            16:27:22
          </div>

          {/* 경매 정보 */}
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <div className="bg-gray-300 w-10 h-10 rounded-full" />
              <div className="ml-4">
                <p className="font-bold text-lg">[나이키] 신발</p>
                <p className="text-sm text-gray-500">시작가: 10,000,000원</p>
                <p className="text-sm text-gray-500">참여 인원: 55명</p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p>
                Air Jordan 1 Retro High OG는 마이클 조던(Michael Jordan)이
                1985년 NBA 농구 시즌에서 신은 초기 디자인을 재현한
                스니커즈입니다. 이 신발은 고급 품질의 가죽과 트라이플 스티치가
                특징인 전통적인 형태를 갖추고 있습니다.
              </p>
              <p>
                Air Jordan 1 Retro High OG는 마이클 조던(Michael Jordan)이
                1985년 NBA 농구 시즌에서 신은 초기 디자인을 재현한
                스니커즈입니다.
              </p>
            </div>
          </div>

          {/* 경매 참여 버튼 */}
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
            경매 참여하기
          </button>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default DetailPage;

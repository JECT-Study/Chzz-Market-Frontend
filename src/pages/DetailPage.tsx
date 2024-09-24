import { AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import JordanBlue from '@/assets/images/jordan_blue.jpeg';
import Layout from '@/components/layout/Layout';
import ProgressBar from '@/components/details/ProgressBar';

import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import Button from '@/components/common/Button';

const Details = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTimerFixed, setIsTimerFixed] = useState(false);

  const totalTime = 24 * 60 * 60; // 24시간을 초로 변환
  const auctionStartTime = 1627880400; // 예시: 서버로부터 전달받은 경매 시작 시간 (초 단위 타임스탬프)
  const serverCurrentTime = Math.floor(Date.now() / 1000); // 예시: 현재 서버 시간 (초 단위 타임스탬프)
  const [isPreAuction, setIsPreAuction] = useState(false); // 사전경매 등록여부 초기값을 false로 설정
  const [interestCount, setInterestCount] = useState(1); // 관심을 가진 사람들의 수

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

  useEffect(() => {
    // 페이지가 로드될 때 한 번만 실행
    const randomPreAuction = Math.random() < 0.5;
    const randomInterestCount = Math.floor(Math.random() * 100);
    setIsPreAuction(randomPreAuction); // true 또는 false 랜덤 결정
    setInterestCount(randomInterestCount); // 0에서 99 사이의 랜덤 숫자

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const timerElement = document.getElementById('timer-section');
      if (timerElement) {
        const { offsetTop } = timerElement;

        if (scrollTop > offsetTop) {
          setIsTimerFixed(true);
        } else {
          setIsTimerFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <Layout.Header
        title="제품 상세"
        handleBack={handleBackClick}
        handleModal={toggleMenu}
      />
      {/* 메인 컨텐츠가 스크롤 가능하도록 수정 */}
      <div className="relative flex flex-col h-screen overflow-hidden">
        <Layout.Main>
          {/* 상품 이미지 영역 */}
          <div className="relative w-full bg-yellow-300">
            <div className="w-full mb-2">
              <img
                src={JordanBlue}
                alt="Jordan Blue"
                className="object-cover w-full h-auto" // Ensures the image maintains its aspect ratio
              />
            </div>
            {/* 타이머 및 프로그레스 바 */}
            <div
              id="timer-section"
              className={`${
                isTimerFixed ? 'fixed top-0 left-0 right-0' : ''
              } bg-white z-10 py-1 border-b border-gray-300`} // Reduced padding on y-axis
            >
              <div className="text-lg font-bold text-center text-green-500">
                {formatTime()}
              </div>
              <ProgressBar progressBarWidth={progressBarWidth} />
            </div>
          </div>

          {/* 경매 정보 영역 */}
          <div className="px-4 my-4">
            {/* 경매 아이템 제목 & 시작가 */}
            <div className="mb-4">
              <p className="mb-1 text-lg font-bold">[나이키] 신발</p>
              <p className="text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <span className="mr-1">💎</span> 시작가{' '}
                  <span className="font-bold">10,000,000원</span>
                </span>
              </p>
            </div>

            {/* 나의 참여 금액 & 경매 참여인원 */}
            <div className="w-full mb-4 border border-gray-300 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1 py-4 text-center">
                  <p className="mb-1 text-sm text-gray-500">나의 참여 금액</p>
                  <p className="text-lg font-bold">참여 전</p>
                </div>
                <div className="h-full border-l border-gray-300" />
                <div className="flex-1 py-4 text-center">
                  <p className="mb-1 text-sm text-gray-500">참여 인원</p>
                  <p className="text-lg font-bold">55명</p>
                </div>
              </div>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className="px-4 mb-4 overflow-y-auto text-sm text-gray-700">
            <p className="mb-2">
              Air Jordan 1 Retro High OG는 마이클 조던(Michael Jordan)이 1985년
              NBA 농구 시즌에서 신은 초기 디자인을 재현한 스니커즈입니다. 이
              신발은 고급 품질의 가죽과 트라이플 스티치가 특징인 전통적인 형태를
              갖추고 있습니다. 클래식한 실루엣과 현대적인 소재를 결합하여,
              어디에서나 주목받을 수 있는 디자인을 제공합니다. 이 제품은 농구
              코트뿐만 아니라 일상 생활에서도 착용하기 좋습니다.
            </p>
            <p className="mb-2">
              Air Jordan 1 Retro High OG는 시대를 초월한 스타일과 우수한
              내구성으로 유명합니다. 이 신발의 고급 가죽은 시간이 지남에 따라 더
              멋진 외관을 유지하며, 트라이플 스티치는 오랜 사용에도 견고함을
              제공합니다. Jordan 브랜드의 아이코닉한 윙 로고와 Nike Air 쿠셔닝
              시스템은 이 신발을 더욱 특별하게 만듭니다. 이는 패션과 기능성을
              모두 갖춘 신발로, 어떤 옷차림에도 잘 어울립니다.
            </p>
            <p className="mb-2">
              Michael Jordan이 처음으로 착용한 Air Jordan 1은 농구 역사에서 가장
              중요한 신발 중 하나로 간주됩니다. 이 신발은 많은 사람들에게 영감을
              주었으며, 농구 문화뿐만 아니라 스니커즈 문화를 혁신적으로
              변화시켰습니다. Air Jordan 1 Retro High OG는 이 전설적인 신발의
              원래 디자인을 충실하게 재현하였으며, 최신 기술과 결합하여 더 나은
              편안함과 성능을 제공합니다. 이 신발은 당신의 스타일을 한층 더
              업그레이드할 것입니다.
            </p>
            <p className="mb-2">
              Jordan 1 Retro High OG는 다양한 컬러웨이로 제공되어 개인의 취향에
              맞게 선택할 수 있습니다. 각 색상은 고유의 스토리를 가지고 있으며,
              모두 Jordan 브랜드의 역사와 유산을 반영하고 있습니다. 이 신발은
              한정판으로 출시되어 수집가들에게도 큰 인기를 끌고 있으며, 매년
              새로운 버전이 출시됩니다. 이러한 이유로 Jordan 1 Retro High OG는
              스니커즈 팬들에게 항상 사랑받는 아이템으로 자리 잡고 있습니다.
            </p>
            <p className="mb-2">
              Air Jordan 1 Retro High OG는 최고급 소재와 장인 정신을 바탕으로
              제작되었습니다. Nike의 기술력과 Jordan 브랜드의 유산이 결합된 이
              신발은 높은 수준의 품질을 자랑합니다. 이 제품은 농구를 사랑하는
              사람들뿐만 아니라, 스타일과 편안함을 중시하는 모든 이들에게 완벽한
              선택이 될 것입니다. 언제 어디서나 돋보이는 신발을 찾고 있다면, Air
              Jordan 1 Retro High OG가 그 답입니다.
            </p>
            <p className="mb-2">
              마이클 조던의 전설적인 커리어와 함께한 Air Jordan 1은 NBA와
              스니커즈 역사에서 없어서는 안 될 부분이 되었습니다. 이 신발은
              단순한 패션 아이템을 넘어, 농구와 문화의 아이콘으로 자리
              잡았습니다. Jordan 1 Retro High OG는 그 시절의 영광을 오늘날로
              이어가고 있으며, 여전히 많은 사람들에게 사랑받고 있습니다. 당신이
              이 신발을 신는 순간, 그 역사를 함께할 수 있을 것입니다.
            </p>
            <p className="mb-2">
              Air Jordan 1 Retro High OG는 마이클 조던(Michael Jordan)이 1985년
              NBA 농구 시즌에서 신은 초기 디자인을 재현한 스니커즈입니다. 이
              신발은 고급 품질의 가죽과 트라이플 스티치가 특징인 전통적인 형태를
              갖추고 있습니다. 클래식한 실루엣과 현대적인 소재를 결합하여,
              어디에서나 주목받을 수 있는 디자인을 제공합니다. 이 제품은 농구
              코트뿐만 아니라 일상 생활에서도 착용하기 좋습니다.
            </p>
            <p className="mb-2">
              Air Jordan 1 Retro High OG는 시대를 초월한 스타일과 우수한
              내구성으로 유명합니다. 이 신발의 고급 가죽은 시간이 지남에 따라 더
              멋진 외관을 유지하며, 트라이플 스티치는 오랜 사용에도 견고함을
              제공합니다. Jordan 브랜드의 아이코닉한 윙 로고와 Nike Air 쿠셔닝
              시스템은 이 신발을 더욱 특별하게 만듭니다. 이는 패션과 기능성을
              모두 갖춘 신발로, 어떤 옷차림에도 잘 어울립니다.
            </p>
            <p className="mb-2">
              Michael Jordan이 처음으로 착용한 Air Jordan 1은 농구 역사에서 가장
              중요한 신발 중 하나로 간주됩니다. 이 신발은 많은 사람들에게 영감을
              주었으며, 농구 문화뿐만 아니라 스니커즈 문화를 혁신적으로
              변화시켰습니다. Air Jordan 1 Retro High OG는 이 전설적인 신발의
              원래 디자인을 충실하게 재현하였으며, 최신 기술과 결합하여 더 나은
              편안함과 성능을 제공합니다. 이 신발은 당신의 스타일을 한층 더
              업그레이드할 것입니다.
            </p>
            <p className="mb-2">
              Jordan 1 Retro High OG는 다양한 컬러웨이로 제공되어 개인의 취향에
              맞게 선택할 수 있습니다. 각 색상은 고유의 스토리를 가지고 있으며,
              모두 Jordan 브랜드의 역사와 유산을 반영하고 있습니다. 이 신발은
              한정판으로 출시되어 수집가들에게도 큰 인기를 끌고 있으며, 매년
              새로운 버전이 출시됩니다. 이러한 이유로 Jordan 1 Retro High OG는
              스니커즈 팬들에게 항상 사랑받는 아이템으로 자리 잡고 있습니다.
            </p>
            <p className="mb-2">
              Air Jordan 1 Retro High OG는 최고급 소재와 장인 정신을 바탕으로
              제작되었습니다. Nike의 기술력과 Jordan 브랜드의 유산이 결합된 이
              신발은 높은 수준의 품질을 자랑합니다. 이 제품은 농구를 사랑하는
              사람들뿐만 아니라, 스타일과 편안함을 중시하는 모든 이들에게 완벽한
              선택이 될 것입니다. 언제 어디서나 돋보이는 신발을 찾고 있다면, Air
              Jordan 1 Retro High OG가 그 답입니다.
            </p>
            <p className="mb-2">
              마이클 조던의 전설적인 커리어와 함께한 Air Jordan 1은 NBA와
              스니커즈 역사에서 없어서는 안 될 부분이 되었습니다. 이 신발은
              단순한 패션 아이템을 넘어, 농구와 문화의 아이콘으로 자리
              잡았습니다. Jordan 1 Retro High OG는 그 시절의 영광을 오늘날로
              이어가고 있으며, 여전히 많은 사람들에게 사랑받고 있습니다. 당신이
              이 신발을 신는 순간, 그 역사를 함께할 수 있을 것입니다.
            </p>
          </div>
        </Layout.Main>
        {/* 화면 하단에 고정된 Footer */}
        <Layout.Footer type={isPreAuction ? 'double' : 'single'}>
          {isPreAuction ? (
            <>
              <div className="flex items-center flex-1 h-full gap-2">
                <AiOutlineHeart className="text-xl text-gray-500" />
                <span className="text-gray-600">{interestCount}명</span>
              </div>
              <Button
                type="button"
                className="flex-[2] h-full"
                color="cheeseYellow"
              >
                경매로 전환하기
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="w-full h-full"
              color="cheeseYellow"
            >
              경매 참여하기
            </Button>
          )}
        </Layout.Footer>
        {/* 백드롭 */}
        {isMenuOpen && (
          <>
            <div
              className="absolute inset-0 z-40 bg-black bg-opacity-50"
              onClick={closeMenu}
              style={{ top: 0, bottom: 0 }}
            />

            {/* 메뉴 (아코디언) */}
            <div className="absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50">
              <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
                수정하기
              </button>
              <button className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100">
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Details;

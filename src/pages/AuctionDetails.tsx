/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BuyersFooter from '@/components/details/BuyersFooter';
import { CiCoins1 } from 'react-icons/ci';
import Layout from '@/components/layout/Layout';
import Participants from '@/assets/icons/participants.svg';
import Price from '@/assets/icons/price.svg';
import ProgressBar from '@/components/details/ProgressBar';
import SellersFooter from '@/components/details/SellersFooter';
import axios from 'axios';
import { IAuctionDetails } from 'AuctionDetails';

const AuctionDetails = () => {
  const { productId } = useParams() as { productId: string };
  const [auctionItem, setAuctionItem] = useState<IAuctionDetails | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTimerFixed, _setIsTimerFixed] = useState(false);
  const [isPreAuction, _setIsPreAuction] = useState(false);
  const [_interestCount, _setInterestCount] = useState(1);

  const totalTime = 24 * 60 * 60;

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

  // 세자리 단위로 콤마를 찍어주는 함수
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auctions/${productId}?viewType=FULL`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setAuctionItem(response.data);
      } catch (fetchError) {
        console.error('경매 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };
    fetchData();
    setIsLoading(false);
  }, [productId]);

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleBack={handleBackClick}
        handleModal={toggleMenu}
        isDisableMenuButton // 메뉴 버튼을 숨기고 싶을 때 true로 설정
      />
      {/* 메인 컨텐츠가 스크롤 가능하도록 수정 */}
      <div className='relative flex flex-col h-screen overflow-hidden'>
        <Layout.Main>
          {/* 상품 이미지 영역 */}
          <div className='relative w-full bg-yellow-300'>
            <div className='w-full mb-2'>
              <img src={`${auctionItem?.imageList[0]}`} alt={auctionItem?.productName} className='object-cover w-full h-auto' />
            </div>
            {/* 타이머 및 프로그레스 바 */}
            {auctionItem && (
              <div id='timer-section' className={`bg-white z-10 py-1 ${isTimerFixed ? 'fixed top-0 left-0 right-0' : ''}`}>
                {isLoading ? (
                  <div className='font-bold text-center text-gray-500'>로딩 중...</div>
                ) : (
                  <ProgressBar
                    initialTimeRemaining={auctionItem.timeRemaining}
                    totalTime={totalTime} // Should be 86400
                  />
                )}
              </div>
            )}
          </div>

          {/* 경매 정보 영역 */}
          <div className='px-4 my-4'>
            {/* 경매 아이템 제목 & 시작가 */}
            {auctionItem && (
              <div className='mb-4'>
                <p className='mb-1 text-lg font-bold'>{auctionItem.productName || '[ERROR] 이름이 등록되지 않았어요!'}</p>
                <p className='text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <span className='mr-1'>
                      <img src={Price} alt='Price' />
                    </span>
                    시작가
                    <span className='font-bold p'>{numberWithCommas(Number(auctionItem.minPrice))}원</span>
                  </span>
                </p>
              </div>
            )}
            {/* 나의 참여 금액 & 경매 참여인원 */}
            <div className='w-full mb-4 border border-gray-300 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col items-center flex-1 py-4 text-center'>
                  <div className='flex items-center mb-1 text-sm text-gray-400'>
                    <CiCoins1 className='mx-1 text-xl' />
                    <span className='ml-1'>나의 참여 금액</span>
                  </div>
                  <p className='text-xl font-bold text-gray-800'>
                    {auctionItem?.isParticipating ? `${numberWithCommas(Number(auctionItem.bidAmount))}원` : '참여 전'}
                  </p>
                </div>
                <div className='h-full border-l border-gray-300' />
                <div className='flex flex-col items-center flex-1 py-4 text-center'>
                  <div className='flex items-center mb-1 text-sm text-gray-400'>
                    <img src={Participants} alt='Participants' className='w-4 h-4 mx-2 mb-1' />
                    <p className='mb-1 text-sm text-gray-500'>참여 인원</p>
                  </div>
                  <p className='text-lg font-bold'>{auctionItem?.participantCount ? `${auctionItem.participantCount}명` : '0명'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className='px-4 mb-4 overflow-y-auto text-sm text-gray-700'>
            <p>{auctionItem?.description}</p>
          </div>
        </Layout.Main>
        {/* 화면 하단에 고정된 Footer */}
        <Layout.Footer type={isPreAuction ? 'double' : 'single'}>
          {auctionItem && auctionItem.isSeller ? (
            <SellersFooter isSeller={auctionItem.isSeller} status={auctionItem.status} />
          ) : (
            <BuyersFooter
              isSeller={auctionItem?.isSeller ?? false}
              status={auctionItem?.status ?? ''}
              isParticipating={auctionItem?.isParticipating ?? false}
              remainingBidCount={auctionItem?.remainingBidCount ?? 0}
            />
          )}
        </Layout.Footer>
        {/* 백드롭 */}
        {isMenuOpen && (
          <>
            <div className='absolute inset-0 z-40 bg-black bg-opacity-50' onClick={closeMenu} style={{ top: 0, bottom: 0 }} />
            {/* 메뉴 (아코디언) */}
            <div className='absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50'>
              <button className='flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200'>수정하기</button>
              <button className='flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100'>삭제하기</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AuctionDetails;

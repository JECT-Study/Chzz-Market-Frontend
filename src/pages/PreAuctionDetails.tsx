/* eslint-disable prettier/prettier */
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import axios from 'axios';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import Price from '@/assets/icons/price.svg';

// 삭제 확인 및 성공 메시지 모달 컴포넌트 임포트 (필요 시 직접 구현)
import ConfirmationModal from '@/components/details/ConfirmationModal';
import SuccessModal from '@/components/details/SuccessModal';
import { useGetPreAuctionDetails } from '@/components/details/queries';

const PreAuctionDetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetails(preAuctionId);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

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

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const onDeleteButtonClickHandler = () => {
    setIsDeleteConfirmOpen(true);
    closeMenu();
  };

  const onModifyButtonClickHandler = () => {
    navigate(`/auctions/edit/${preAuctionDetails.productId}`);
  };

  const onConfirmDeleteHandler = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/products/${preAuctionDetails.productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setIsDeleteConfirmOpen(false);
      setIsDeleteSuccessOpen(true);
    } catch (error) {
      setIsDeleteSuccessOpen(true);
    }
  };

  const onCloseSuccessModalHandler = () => {
    setIsDeleteSuccessOpen(false);
    navigate('/');
  };

  return (
    <Layout>
      <Layout.Header title='제품 상세' handleBack={handleBackClick} handleModal={toggleMenu} />
      {/* 메인 컨텐츠가 스크롤 가능하도록 수정 */}
      <div className='relative flex flex-col h-screen overflow-hidden'>
        <Layout.Main>
          {/* 상품 이미지 영역 */}
          <div className='relative w-full bg-yellow-300'>
            <div className='w-full mb-2'>
              <img src={preAuctionDetails.imageUrls[0]} alt={preAuctionDetails.productName} className='object-cover w-full h-auto' />
            </div>
          </div>

          {/* 경매 정보 영역 */}
          <div className='px-4 my-4'>
            {/* 경매 아이템 제목 & 시작가 */}
            {preAuctionDetails && (
              <div className='mb-4'>
                <p className='mb-1 text-lg font-bold'>{preAuctionDetails.productName || '[ERROR] 이름이 등록되지 않았어요!'}</p>
                <p className='text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <span className='mr-1'>
                      <img src={Price} alt='Price' />
                    </span>
                    시작가
                    <span className='font-bold p'>{numberWithCommas(Number(preAuctionDetails.minPrice))}원</span>
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* 상품 설명 */}
          <div className='px-4 mb-4 overflow-y-auto text-sm text-gray-700'>
            <p>{preAuctionDetails.description}</p>
          </div>
        </Layout.Main>
        {/* 화면 하단에 고정된 Footer */}
        <Layout.Footer type='double'>
          <div>TEMP</div>
        </Layout.Footer>
        {/* 백드롭 */}
        {isMenuOpen && (
          <>
            <div className='absolute inset-0 z-40 bg-black bg-opacity-50' onClick={closeMenu} />
            {/* 메뉴 (아코디언) */}
            <div className='absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50'>
              <button className='flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200' onClick={onModifyButtonClickHandler}>
                수정하기
              </button>
              <button className='flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100' onClick={onDeleteButtonClickHandler}>
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
      {/* 삭제 확인 다이얼로그 */}
      {isDeleteConfirmOpen && (
        <ConfirmationModal message='정말 삭제하시겠습니까?' onConfirm={onConfirmDeleteHandler} onCancel={() => setIsDeleteConfirmOpen(false)} />
      )}
      {/* 삭제 성공 메시지 */}
      {isDeleteSuccessOpen && <SuccessModal message='아이템이 삭제되었습니다.' onClose={onCloseSuccessModalHandler} />}
    </Layout>
  );
};

export default PreAuctionDetails;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};

/* eslint-disable prettier/prettier */
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useNavigate, useLoaderData, LoaderFunction } from 'react-router-dom';
import Price from '@/assets/icons/price.svg';
import {
  useDeletePreAuction,
  useGetPreAuctionDetails,
} from '@/components/details/queries';
import SellersFooter from '@/components/details/SellersFooter';
import BuyersFooter from '@/components/details/BuyersFooter';
import ConfirmationModal from '@/components/details/ConfirmationModal';
import SuccessModal from '@/components/details/SuccessModal';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const PreAuction = () => {
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetails(preAuctionId);
  if (!preAuctionDetails) {
    throw new Error('해당 사전 경매 정보를 찾을 수 없습니다.');
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const navigate = useNavigate();
  const { mutate: deletePreAuction } = useDeletePreAuction();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Delete button click handler
  const onDeleteButtonClickHandler = () => {
    setIsDeleteConfirmOpen(true);
    closeMenu();
  };

  const onEditButtonClickHandler = () => {
    navigate(`/auctions/pre-auction/edit/${preAuctionDetails.productId}`);
  };

  const handleConfirmDelete = () => {
    deletePreAuction(preAuctionId, {
      onSuccess: () => {
        setIsDeleteConfirmOpen(false);
        setIsDeleteSuccessOpen(true);
      },
    });
  };

  // Success modal close handler
  const handleCloseSuccessModal = () => {
    setIsDeleteSuccessOpen(false);
    navigate('/');
  };

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleModal={toggleMenu}
        isDisableMenuButton={!preAuctionDetails.isSeller}
      />
      <div className='relative flex flex-col h-screen overflow-hidden'>
        <Layout.Main>
          <div className='relative w-full bg-yellow-300'>
            <div className='w-full mb-2'>
              <img
                src={preAuctionDetails?.imageUrls[0]}
                alt={preAuctionDetails?.productName}
                className='object-cover w-full h-auto'
              />
            </div>
          </div>
          <div className='px-4 my-4'>
            {preAuctionDetails && (
              <div className='mb-4'>
                <p className='mb-1 text-lg font-bold'>
                  {preAuctionDetails.productName}
                </p>
                <p className='text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <span className='mr-1'>
                      <img src={Price} alt='Price' />
                    </span>
                    시작가
                    <span className='font-bold'>
                      {formatCurrencyWithWon(preAuctionDetails.minPrice)}원
                    </span>
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className='px-4 mb-4 overflow-y-auto text-sm text-gray-700'>
            <p>{preAuctionDetails?.description}</p>
          </div>
        </Layout.Main>
        <Layout.Footer type='double'>
          {preAuctionDetails.isSeller ? (
            <SellersFooter
              likeCount={preAuctionDetails.likeCount}
              isSeller={preAuctionDetails.isSeller}
              auctionId={preAuctionDetails.productId}
              status='PENDING'
            />
          ) : (
            <BuyersFooter
              isSeller={preAuctionDetails?.isSeller}
              likeCount={preAuctionDetails.likeCount}
              auctionId={preAuctionId}
              status='PENDING'
              isParticipated={preAuctionDetails?.isLiked}
            />
          )}
        </Layout.Footer>
        {isMenuOpen && (
          <>
            <div
              className='absolute inset-0 z-40 bg-black bg-opacity-50'
              onClick={closeMenu}
            />
            <div className='absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50'>
              <button
                className='flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200'
                onClick={onEditButtonClickHandler}
              >
                수정하기
              </button>
              <button
                className='flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100'
                onClick={onDeleteButtonClickHandler}
              >
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
      {isDeleteConfirmOpen && (
        <ConfirmationModal
          message='정말 삭제하시겠습니까?'
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
      {isDeleteSuccessOpen && (
        <SuccessModal
          message='아이템이 삭제되었습니다.'
          onClose={handleCloseSuccessModal}
        />
      )}
    </Layout>
  );
};

export default PreAuction;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};

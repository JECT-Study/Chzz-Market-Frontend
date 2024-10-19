import DeleteIcon from '@/assets/icons/modal_cancel.svg';
import EditIcon from '@/assets/icons/modal_edit.svg';
import {
  useDeletePreAuction,
  useGetPreAuctionDetailsWithSuspense
} from '@/components/details/queries';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import BoxEditIcon from '@/assets/icons/in_box_edit_time.svg';
import BoxLikeIcon from '@/assets/icons/in_box_like.svg';
import Button from '@/components/common/Button';
import ConfirmModal from '@/components/common/ConfirmModal';
import CustomCarousel from '@/components/common/CustomCarousel';
import DetailsBasic from '@/components/details/DetailsBasic';
import PreAuctionDetailsFooter from '@/components/details/PreAuctionDetailsFooter';
import Layout from '@/components/layout/Layout';
import { CarouselItem } from '@/components/ui/carousel';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { useState } from 'react';

const PreAuctionDetails = () => {
  const navigate = useNavigate();
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetailsWithSuspense(preAuctionId);
  const { images, productName, productId, likeCount, sellerNickname, minPrice, isSeller, description, category, sellerProfileImageUrl, updatedAt } = preAuctionDetails
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { mutate: deletePreAuction, isPending } = useDeletePreAuction();

  const updatedTime = getTimeAgo(updatedAt)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleConfirm = () => setIsDeleteConfirmOpen((prev) => !prev)
  const clickDelete = () => {
    toggleMenu()
    toggleConfirm()
  }
  const clickEdit = () => navigate(`/auctions/pre-auction/edit/${productId}`);
  const confirmDelete = () => deletePreAuction(preAuctionId);

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleModal={toggleMenu}
        isDisableMenuButton={!isSeller}
      />
      <Layout.Main>
        <div className='flex flex-col gap-5'>
          <CustomCarousel length={images.length} loop>
            {images.map((img) => (
              <CarouselItem className='flex items-center justify-center' key={img.imageId}>
                <img src={img.imageUrl} alt={`${productName}${img.imageId}`} />
              </CarouselItem>
            ))}
          </CustomCarousel>
          <DetailsBasic profileImg={sellerProfileImageUrl} nickname={sellerNickname} productName={productName} minPrice={minPrice} category={category} />

          <div className='flex items-center justify-between border rounded-lg border-gray3'>
            <div aria-label="수정 시간" className='flex flex-col items-center w-full gap-1 py-4'>
              <div className='flex items-center gap-1 text-body2 text-gray2'>
                <img src={BoxEditIcon} alt="수정 시간" className='size-5' />
                <span className='pt-[2px]'>수정 시간</span>
              </div>
              <p className='text-body1Bold text-gray1'>
                {updatedTime}
              </p>
            </div>
            <div aria-label="좋아요"
              className="flex flex-col items-center w-full gap-1 py-4">
              <div className='flex items-center gap-1 text-body2 text-gray2'>
                <img src={BoxLikeIcon} alt='좋아요' className='size-4' />
                <span className='pt-[2px]'>좋아요</span>
              </div>
              <p className='text-body1Bold text-gray1'>
                {`${likeCount} 명`}
              </p>
            </div>
          </div >
          <p className='overflow-y-auto text-body2 text-gray1'>
            {description}
          </p>
        </div>
      </Layout.Main>
      <PreAuctionDetailsFooter likeCount={likeCount} preAuctionId={preAuctionId} isSeller={isSeller} />
      {
        isMenuOpen && (
          <div className='absolute inset-0 bg-black/30' onClick={toggleMenu}>
            <div onClick={(e) => e.stopPropagation()} className='absolute flex flex-col w-1/5 bg-white rounded-lg sm:text-body1 text-body2 top-3 right-3'>
              <button onClick={clickEdit} className='flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10'>
                <span>수정하기</span>
                <img src={EditIcon} alt="수정 아이콘" className='size-5 mb-[2px]' />
              </button>
              <button className='flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10 text-redNotice' onClick={clickDelete}>
                <span>삭제하기</span>
                <img src={DeleteIcon} alt="삭제 아이콘" className='size-5 mb-[2px]' />
              </button>
            </div>
          </div>)
      }
      {
        isDeleteConfirmOpen &&
        <ConfirmModal title='사전 경매를 삭제하시겠어요?' description='사전 경매 참여자들에게 경매 취소 알림이 발송됩니다.' close={toggleConfirm} >
          <Button disabled={isPending} loading={isPending} type='button' color='cheeseYellow' className='w-full' onClick={confirmDelete}>
            삭제
          </Button>
        </ConfirmModal>
      }
    </Layout >)

}

export default PreAuctionDetails;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};

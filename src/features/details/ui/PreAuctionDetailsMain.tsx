import { DetailsBasic, DetailsOption, PreAuctionDetailsFooter } from '.';
import { useDeletePreAuction, useGetAuctionDetails } from '..';

import { Layout } from '@/app/layout';
import type { IPreAuctionDetails } from '@/entities';
import BoxEditIcon from '@/shared/assets/icons/in_box_edit_time.svg';
import BoxLikeIcon from '@/shared/assets/icons/in_box_like.svg';
import ProfileDefaultImage from '@/shared/assets/icons/profile.svg';
import ThreeDotsIcon from '@/shared/assets/icons/three_dots.svg';
import { CustomCarousel } from '@/shared/ui/CustomCarousel';
import { Modal } from '@/shared/ui/Modal';
import { ProgressiveImage } from '@/shared/ui/ProgressiveImage';
import { CarouselItem } from '@/shared/ui/carousel';
import { getTimeAgo } from '@/shared/utils/getTimeAgo';
import { useNavigate } from 'react-router';

export const PreAuctionDetailsMain = ({ auctionId }: { auctionId: number }) => {
  const navigate = useNavigate();

  const { details } = useGetAuctionDetails<IPreAuctionDetails>(auctionId);
  const { mutate: deletePreAuction, isPending } = useDeletePreAuction();

  const { images, auctionName, likeCount, isLiked, sellerNickname, minPrice, isSeller, description, category, sellerProfileImageUrl, updatedAt } = details
  const updatedTime = getTimeAgo(updatedAt)

  const clickEdit = () => navigate(`/auctions/pre-auction/edit/${auctionId}`);
  const confirmDelete = () => deletePreAuction(auctionId);

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        option={isSeller && (
          <Modal>
            <Modal.Open name='option'>
              <button
                aria-label='옵션'
                className='absolute right-2'
              >
                <img src={ThreeDotsIcon} alt='옵션 아이콘' className='size-5' />
              </button>
            </Modal.Open>
            <Modal.Window name='option'>
              <DetailsOption clickEdit={clickEdit} confirmDelete={confirmDelete} isPending={isPending} />
            </Modal.Window>
          </Modal>)}
      />
      <Layout.Main>
        <figure>
          <div className='-mx-[1.25rem] -mt-[1.25rem] web:-mt-[2rem] web:-mx-[2rem]'>
            <CustomCarousel length={images.length} loop>
              {images.map((img, idx) => (
                <CarouselItem className='flex items-center justify-center' key={img.imageId}>
                  <ProgressiveImage lowResSrc={`${img.imageUrl}?h=20`} highResSrc={`${img.imageUrl}?h=840`} alt={`상품 사진_${idx}`} className='object-contain h-[420px]' priority={idx === 0 ? 'high' : 'low'} loading={idx === 0 ? 'eager' : 'lazy'} />
                </CarouselItem>
              ))}
            </CustomCarousel>
          </div>
          <figcaption>
            {/* 판매자 정보 */}
            <div className='flex items-center gap-[13px] h-[3.75rem]'>
              <img src={sellerProfileImageUrl ?? ProfileDefaultImage} alt="판매자 프로필 사진" className='border rounded-full size-[1.875rem]' />
              <p className='text-body2' aria-label='판매자 이름'>
                {sellerNickname}
              </p>
            </div>

            {/* 상품 정보 */}
            <div className='flex flex-col gap-4'>
              <DetailsBasic auctionName={auctionName} minPrice={minPrice} category={category} />
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
                    <span className='pt-[2px]'>찜한 사람</span>
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
          </figcaption>
        </figure>
      </Layout.Main>
      <PreAuctionDetailsFooter isLiked={isLiked} auctionId={auctionId} isSeller={isSeller} />
    </Layout>
  );
}
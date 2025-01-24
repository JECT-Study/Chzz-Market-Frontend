import { AuctionDetailsFooter, DetailsBasic, ProgressBar } from ".";
import { CarouselItem, CustomCarousel, formatCurrencyWithWon } from "@/shared";

import { Layout } from "@/app/layout";
import ParticipantAmount from '@/shared/assets/icons/my_participation_amount.svg';
import Participants from '@/shared/assets/icons/participants.svg';
import ProfileDefaultImage from '@/shared/assets/icons/profile.svg';
import { useGetAuctionDetails } from "..";

export const AuctionDetailsMain = ({ auctionId }: { auctionId: number }) => {
  const { auctionDetails } = useGetAuctionDetails(auctionId);
  const { images, auctionName, timeRemaining, sellerNickname, minPrice, bidAmount, isParticipated, description, participantCount, category, sellerProfileImageUrl, isCancelled, isSeller } = auctionDetails

  return (
    <Layout>
      <Layout.Header title="제품 상세" />
      <Layout.Main>
        <figure>
          {/* 상품 이미지 */}
          <div className='-mx-[1.25rem] -mt-[1.25rem] web:-mt-[2rem] web:-mx-[2rem] flex flex-col'>
            <CustomCarousel length={images.length} loop>
              {images.map((img, idx) => (
                <CarouselItem className='flex items-center justify-center' key={img.imageId}>
                  <img src={`${img.imageUrl}?h=840`} alt={`상품 사진_${idx}`} className='object-contain h-[420px]' {...{ fetchpriority: idx === 0 ? 'high' : 'low' }} loading={idx === 0 ? 'eager' : 'lazy'} />
                </CarouselItem>
              ))}
            </CustomCarousel>
            <ProgressBar
              initialTimeRemaining={timeRemaining}
              auctionId={auctionId}
            />
          </div>
          <figcaption>
            {/* 판매자 정보 */}
            <div className='flex items-center gap-[13px] h-[3.75rem]'>
              <img src={sellerProfileImageUrl ?? ProfileDefaultImage} alt="판매자 프로필 사진" className='border rounded-full size-[1.875rem]' />
              <p className='text-body2' aria-label="판매자 이름">
                {sellerNickname}
              </p>
            </div>

            {/* 상품 정보 */}
            <div className='flex flex-col gap-4'>
              <DetailsBasic auctionName={auctionName} minPrice={minPrice} category={category} />
              <div className='flex items-center justify-between border rounded-lg border-gray3'>
                <div aria-label="참여 금액" className='flex flex-col items-center w-full gap-1 py-4'>
                  <div className='flex items-center gap-1 text-body2 text-gray2'>
                    <img src={ParticipantAmount} alt="나의 참여 금액" className='size-5' />
                    <span className='pt-[2px]'>나의 참여 금액</span>
                  </div>
                  <p className='text-body1Bold text-gray1'>
                    {isSeller ? '내가 등록한 경매' : isParticipated
                      ? `${formatCurrencyWithWon(bidAmount)}`
                      : (isCancelled ? '참여 취소' : '참여 전')}
                  </p>
                </div>
                <div aria-label="참여 인원"
                  className="flex flex-col items-center w-full gap-1 py-4">
                  <div className='flex items-center gap-2 text-body2 text-gray2'>
                    <img src={Participants} alt='참여 인원' className='size-4' />
                    <span className='pt-[2px]'>참여 인원</span>
                  </div>
                  <p className='text-body1Bold text-gray1'>
                    {`${participantCount} 명`}
                  </p>
                </div>
              </div >
              <p className='overflow-y-auto whitespace-pre-wrap text-body2 text-gray1'>
                {description}
              </p>
            </div>
          </figcaption>
        </figure>
      </Layout.Main>
      <AuctionDetailsFooter
        auctionId={auctionId}
      />
    </Layout>
  );
}
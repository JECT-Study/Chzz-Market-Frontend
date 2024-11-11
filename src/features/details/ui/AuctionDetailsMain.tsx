import { Layout } from "@/app/layout";
import { CustomCarousel, formatCurrencyWithWon } from "@/shared";
import ParticipantAmount from '@/shared/assets/icons/my_participation_amount.svg';
import Participants from '@/shared/assets/icons/participants.svg';
import ProfileDefaultImage from '@/shared/assets/icons/profile.svg';
import { CarouselItem } from "@/shared/shadcn/ui/carousel";
import { AuctionDetailsFooter, DetailsBasic, ProgressBar } from ".";
import { useGetAuctionDetails } from "..";

export const AuctionDetailsMain = ({ auctionId }: { auctionId: number }) => {
  const { auctionDetails } = useGetAuctionDetails(auctionId);
  const { images, productName, timeRemaining, sellerNickname, minPrice, bidAmount, isParticipated, description, participantCount, category, sellerProfileImageUrl, isCancelled } = auctionDetails

  return (
    <>
      <Layout.Main>
        <figure>
          {/* 상품 이미지 */}
          <div className='-mx-[20px] -mt-[20px] h-[21.25rem] flex flex-col'>
            <CustomCarousel contentStyle="h-[21.25rem]" length={images.length} loop>
              {images.map((img) => (
                <CarouselItem className='w-full h-full' key={img.imageId}>
                  <img src={img.imageUrl} className='object-cover w-full h-full' alt={`${productName}${img.imageId}`} />
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
              <img src={sellerProfileImageUrl ?? ProfileDefaultImage} alt="판매자 프로필" className='border rounded-full size-[1.875rem]' />
              <p className='text-body2'>
                {sellerNickname}
              </p>
            </div>

            {/* 상품 정보 */}
            <div className='flex flex-col gap-4'>
              <DetailsBasic productName={productName} minPrice={minPrice} category={category} />
              <div className='flex items-center justify-between border rounded-lg border-gray3'>
                <div aria-label="참여 금액" className='flex flex-col items-center w-full gap-1 py-4'>
                  <div className='flex items-center gap-1 text-body2 text-gray2'>
                    <img src={ParticipantAmount} alt="나의 참여 금액" className='size-5' />
                    <span className='pt-[2px]'>나의 참여 금액</span>
                  </div>
                  <p className='text-body1Bold text-gray1'>
                    {isParticipated
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
    </>
  );
}
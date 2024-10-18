import ParticipantAmount from '@/assets/icons/my_participation_amount.svg';
import ProfileDefaultImage from '@/assets/icons/profile.svg';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

import Participants from '@/assets/icons/participants.svg';
import CustomCarousel from '@/components/common/CustomCarousel';
import MinPrice from '@/components/common/atomic/MinPrice';
import BuyersFooter from '@/components/details/BuyersFooter';
import ProgressBar from '@/components/details/ProgressBar';
import SellersFooter from '@/components/details/SellersFooter';
import { useGetAuctionDetails } from '@/components/details/queries';
import Layout from '@/components/layout/Layout';
import { CarouselItem } from '@/components/ui/carousel';
import { CATEGORIES } from '@/constants/categories';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;
  const { auctionDetails, refetch } = useGetAuctionDetails(auctionId);
  const { images, productName, timeRemaining, sellerNickname, minPrice, bidAmount, isParticipated, bidId, remainingBidCount, status, isSeller, description, participantCount, category, sellerProfileImageUrl, isCancelled } = auctionDetails

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        isDisableMenuButton
      />
      <Layout.Main>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <CustomCarousel length={images.length} loop>
              {images.map((img) => (
                <CarouselItem key={img.imageId}>
                  <img src={img.imageUrl} alt={`${productName}${img.imageId}`} />
                </CarouselItem>
              ))}
            </CustomCarousel>
            <ProgressBar
              refetch={refetch}
              initialTimeRemaining={timeRemaining}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <img src={sellerProfileImageUrl ?? ProfileDefaultImage} alt="판매자 프로필" className='border rounded-full size-10' />
              <p className='text-body2'>
                {sellerNickname}
              </p>
            </div>
            <p className='text-heading2'>
              {productName}
            </p>
            <span className='inline underline cursor-pointer text-gray2 text-body2'>{CATEGORIES[category].value}</span>
            <MinPrice price={minPrice} />
          </div>
          <div className='w-full mb-4 border border-gray-300 rounded-lg text-body1 text-gray2'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col items-center flex-1 gap-2 py-4 text-center '>
                <div className='flex items-center gap-1 '>
                  <img src={ParticipantAmount} alt="나의 참여 금액" className='size-5' />
                  <span>나의 참여 금액</span>
                </div>
                <p className='text-body1Bold text-gray1'>
                  {isParticipated
                    ? `${formatCurrencyWithWon(bidAmount)}`
                    : (isCancelled ? '참여 취소' : '참여 전')}
                </p>
              </div>
              <div className='h-full border-l border-gray-300' />
              <div className='flex flex-col items-center flex-1 py-4 text-center'>
                <div className='flex items-center mb-1'>
                  <img
                    src={Participants}
                    alt='Participants'
                    className='w-4 h-4 mx-2 mb-1'
                  />
                  <p>참여 인원</p>
                </div>
                <p className='text-body1Bold text-gray1'>
                  {`${participantCount}명`}
                </p>
              </div>
            </div>
          </div>

          <div className='overflow-y-auto text-body2 text-gray1'>
            <p>{description || ''}</p>
          </div>
        </div>
      </Layout.Main>
      {isSeller ? (
        <SellersFooter
          auctionId={auctionId}
          status={status}
        />
      ) : (
        <BuyersFooter
          isParticipated={isParticipated}
          auctionId={auctionId}
          bidId={bidId ?? 0}
          status={status}
          remainingBidCount={remainingBidCount}
          isCancelled={isCancelled}
        />
      )}
    </Layout>
  );
};

export default AuctionDetails;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};

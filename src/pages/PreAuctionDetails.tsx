import {
  useDeletePreAuction,
  useGetPreAuctionDetailsWithSuspense
} from '@/components/details/queries';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import BoxEditIcon from '@/assets/icons/in_box_edit_time.svg';
import BoxLikeIcon from '@/assets/icons/in_box_like.svg';
import ThreeDotsIcon from '@/assets/icons/three_dots.svg';
import CustomCarousel from '@/components/common/CustomCarousel';
import Modal from '@/components/common/Modal';
import DetailsBasic from '@/components/details/DetailsBasic';
import DetailsOption from '@/components/details/DetailsOption';
import PreAuctionDetailsFooter from '@/components/details/PreAuctionDetailsFooter';
import Layout from '@/components/layout/Layout';
import { CarouselItem } from '@/components/ui/carousel';
import { getTimeAgo } from '@/utils/getTimeAgo';

const PreAuctionDetails = () => {
  const navigate = useNavigate();
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetailsWithSuspense(preAuctionId);
  const { mutate: deletePreAuction, isPending } = useDeletePreAuction();

  const { images, productName, productId, likeCount, sellerNickname, minPrice, isSeller, description, category, sellerProfileImageUrl, updatedAt } = preAuctionDetails
  const updatedTime = getTimeAgo(updatedAt)

  const clickEdit = () => navigate(`/auctions/pre-auction/edit/${productId}`);
  const confirmDelete = () => deletePreAuction(preAuctionId);

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        option={isSeller && (
          <Modal>
            <Modal.Open>
              <button
                aria-label='옵션'
                className='absolute right-2'
              >
                <img src={ThreeDotsIcon} alt='옵션 아이콘' className='size-5' />
              </button>
            </Modal.Open>
            <Modal.Window>
              <DetailsOption clickEdit={clickEdit} confirmDelete={confirmDelete} isPending={isPending} />
            </Modal.Window>
          </Modal>)}
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
    </Layout >)
}

export default PreAuctionDetails;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};

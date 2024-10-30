import { useDeletePreAuctionHeart, useGetPreAuctionHeartList } from '@/components/heart/queries';

import type { IPreAuctionItem } from '@/@types/AuctionItem';
import Button from '@/components/common/Button';
import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import AuctionItem from '@/components/common/item/AuctionItem';
import { useNavigate } from 'react-router-dom';

const Heart = () => {
  const navigate = useNavigate();
  const { preAuctionHeartList } = useGetPreAuctionHeartList();
  const { mutate } = useDeletePreAuctionHeart();

  const handleDelete = (id: number) => mutate(id);

  return (
    <EmptyBoundary length={preAuctionHeartList.length} name='heart'>
      <ul className='grid items-center justify-center grid-cols-2 gap-4'>
        {preAuctionHeartList.map((el: IPreAuctionItem) => (
          <li key={el.productId} onClick={() => navigate(`/auctions/pre-auction/${el.productId}`)} className='cursor-pointer'>
            <AuctionItem axis='column' label='내가 찜 한 사전 경매 상품'>
              <AuctionItem.Image src={el.imageUrl} />
              <AuctionItem.Main name={el.productName} count={el.likeCount} price={el.minPrice} kind='pre-register' />
              <AuctionItem.Button>
                <Button onClick={() => handleDelete(el.productId)} type='button' color='white' className='w-full'>
                  찜 목록에서 제외
                </Button>
              </AuctionItem.Button>
            </AuctionItem>
          </li>
        ))}
      </ul>
    </EmptyBoundary>
  );
};

export default Heart;

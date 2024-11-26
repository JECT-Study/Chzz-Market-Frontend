import { AuctionItem, Button, EmptyBoundary, ROUTES } from '@/shared';
import { useDeletePreAuctionHeart, useGetPreAuctionHeartList } from '../model';

import type { IPreAuctionItem } from '@/entities';
import { useNavigate } from 'react-router-dom';

export const HeartList = () => {
  const navigate = useNavigate();
  const { preAuctionHeartList } = useGetPreAuctionHeartList();
  const { mutate } = useDeletePreAuctionHeart();

  const handleDelete = (id: number) => mutate(id);

  return (
    <EmptyBoundary type='heart' length={preAuctionHeartList.length}>
      <ul className='grid items-center justify-between grid-cols-2 gap-4'>
        {preAuctionHeartList.map((el: IPreAuctionItem) => (
          <li key={el.auctionId} onClick={() => navigate(ROUTES.PRE_AUCTION.getItemRoute(el.auctionId))} className='cursor-pointer'>
            <AuctionItem axis='column' label='내가 찜 한 사전 경매 상품'>
              <AuctionItem.Image src={el.imageUrl} />
              <AuctionItem.Main name={el.productName} count={el.likeCount} price={el.minPrice} kind='pre-register' />
              <AuctionItem.Button>
                <Button onClick={() => handleDelete(el.auctionId)} type='button' className='w-full'>
                  찜 목록에서 제외
                </Button>
              </AuctionItem.Button>
            </AuctionItem>
          </li>
        ))}
      </ul>
    </EmptyBoundary>
  );
}
import { AuctionItem, Button, EmptyBoundary, ROUTES } from '@/shared';

import type { IPreAuctionItem } from '@/entities';
import { useNavigate } from 'react-router-dom';
import { useDeleteHeart, useGetHeartList } from '..';

export const HeartList = () => {
  const navigate = useNavigate();
  const { heartList } = useGetHeartList();
  const { mutate } = useDeleteHeart();

  const handleDelete = (id: number) => mutate(id);

  return (
    <EmptyBoundary type='heart' length={heartList.length}>
      <ul className='grid items-center justify-between grid-cols-2 gap-4'>
        {heartList.map((el: IPreAuctionItem) => (
          <li key={el.auctionId} onClick={() => navigate(ROUTES.PRE_AUCTION.getItemRoute(el.auctionId))} className='cursor-pointer'>
            <AuctionItem axis='column' label='내가 찜 한 사전 경매 상품'>
              <AuctionItem.Image src={el.imageUrl} />
              <AuctionItem.Main name={el.auctionName} count={el.likeCount} price={el.minPrice} kind='pre-register' />
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
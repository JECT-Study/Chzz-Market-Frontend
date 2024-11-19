import { AuctionItem, Button, ROUTES } from '@/shared';
import { useDeletePreAuctionHeart, useGetPreAuctionHeartList } from '../model';

import type { IPreAuctionItem } from '@/entities';
import { useNavigate } from 'react-router-dom';

export const HeartList = () => {
  const navigate = useNavigate();
  const { preAuctionHeartList } = useGetPreAuctionHeartList();
  const { mutate } = useDeletePreAuctionHeart();

  const handleDelete = (id: number) => mutate(id);

  return (
    <>
      {preAuctionHeartList.map((el: IPreAuctionItem) => (
        <li key={el.productId} onClick={() => navigate(ROUTES.PRE_AUCTION.getItemRoute(el.productId))} className='cursor-pointer'>
          <AuctionItem axis='column' label='내가 찜 한 사전 경매 상품'>
            <AuctionItem.Image src={el.imageUrl} />
            <AuctionItem.Main name={el.productName} count={el.likeCount} price={el.minPrice} kind='pre-register' />
            <AuctionItem.Button>
              <Button onClick={() => handleDelete(el.productId)} type='button' className='w-full'>
                찜 목록에서 제외
              </Button>
            </AuctionItem.Button>
          </AuctionItem>
        </li>
      ))}
    </>
  );
}
import {
  useDeletePreRegisterHeart,
  useGetPreRegisterHeart,
} from '@/components/heart/queries';

import AuctionItem from '@/components/common/AuctionItem';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigationContext } from '@/components/navigation/NavigationContext';
import { PreRegisterAuction } from 'Auction';

const Heart = () => {
  const navigate = useNavigate();
  const { handleNavigationState } = useNavigationContext();
  const { preRegisterHeartList } = useGetPreRegisterHeart();
  const { mutate } = useDeletePreRegisterHeart();
  const handleDelete = (id: number) => mutate(id);

  useEffect(() => {
    handleNavigationState({
      title: '좋아요 한 사전 경매 목록',
      active: 'heart',
    });
  }, [handleNavigationState]);

  return (
    <ul className="grid items-center justify-center grid-cols-2 gap-4 px-10 py-5">
      {preRegisterHeartList.map((el: PreRegisterAuction) => (
        <li
          key={el.id}
          onClick={() => navigate(`/product/${el.id}`)}
          className="cursor-pointer"
        >
          <AuctionItem axis="column" label="좋아요 한 사전 경매 상품">
            <AuctionItem.Image src={el.cdnPath} />
            <AuctionItem.Main
              name={el.name}
              count={el.likeCount}
              price={el.minPrice}
              kind="pre-register"
            />
            <AuctionItem.Button>
              <Button
                onClick={() => handleDelete(el.id)}
                type="button"
                color="black"
                hoverColor="black"
                className="w-full"
              >
                좋아요
              </Button>
            </AuctionItem.Button>
          </AuctionItem>
        </li>
      ))}
    </ul>
  );
};

export default Heart;


import { Layout } from '@/app/layout/ui/Layout';
import type { IAuctionDetails } from '@/entities/auction/types/details';
import { useGetAuctionDetails } from '@/features/details/model/useGetAuctionDetails';
import { AuctionItem } from '@/shared/ui/AuctionItem';
import { Button } from '@/shared/ui/Button';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BIDDER_LIST_PRICE_FILTER } from '../config/constants';
import { type IBidder } from '../config/type';
import { useGetBidderList } from '../model/useGetBidderList';

export const BidderListMain = ({ auctionId }: { auctionId: number }) => {
  const [filterState, setFilterState] = useState(BIDDER_LIST_PRICE_FILTER.HIGH);
  const navigate = useNavigate();
  const { details } = useGetAuctionDetails<IAuctionDetails>(auctionId);
  const { bidderList } = useGetBidderList(auctionId);

  const { images, auctionName, minPrice, participantCount } = details;

  const handleFilterState = () =>
    setFilterState((prev) =>
      prev.name === BIDDER_LIST_PRICE_FILTER.HIGH.name
        ? BIDDER_LIST_PRICE_FILTER.LOW
        : BIDDER_LIST_PRICE_FILTER.HIGH
    );

  const filteredBidderList =
    filterState.sort === 'desc'
      ? Array.from(bidderList).sort((a, b) => b.bidAmount - a.bidAmount)
      : Array.from(bidderList).sort((a, b) => a.bidAmount - b.bidAmount);

  return (
    <Layout>
      <Layout.Header title="경매 참여자 목록" />
      <Layout.Main>
        <div className="flex flex-col gap-8 pt-4">
          <AuctionItem axis="row" label="입찰자 목록 상품">
            <AuctionItem.Image src={images[0].imageUrl} />
            <AuctionItem.Main
              kind="register"
              name={auctionName}
              count={participantCount}
              price={minPrice}
            />
          </AuctionItem>
          <div className="flex items-center justify-between">
            <h2 className="text-heading2">참여 가격</h2>
            <button
              aria-label="필터링 버튼"
              onClick={handleFilterState}
              className="flex items-center gap-1 cursor-pointer text-body2 text-gray1"
            >
              <span aria-label="필터 이름">{filterState.name}</span>
              <img
                className="pb-1"
                src={filterState.icon}
                alt={filterState.name}
              />
            </button>
          </div>
          <hr className="border my-[-16px] border-gray3" />
          <ul className="flex flex-col gap-2">
            {filteredBidderList.map((el: IBidder, idx: number) => (
              <li
                aria-label="입찰자 리스트 아이템"
                key={el.bidderNickname}
                className={`flex p-3 items-center justify-between text-gray1 ${idx === 0 ? 'border border-cheeseYellow rounded-lg' : ''}`}
              >
                <span aria-label="입찰자 이름" className="text-body1">
                  {el.bidderNickname}
                </span>
                <span aria-label="입찰자 입찰가" className="text-body1Bold">
                  {formatCurrencyWithWon(el.bidAmount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="button"
          onClick={() => navigate(-1)}
          color="cheeseYellow"
          className="w-full h-full"
          ariaLabel="확인 완료"
        >
          확인 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

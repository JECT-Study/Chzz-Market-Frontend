import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import AuctionItem from '@/components/common/AuctionItem';
import Button from '@/components/common/Button';
import Layout from '@/components/layout/Layout';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { useGetProductDetails } from '@/components/details/queries';
import { useState } from 'react';
import { BIDDER_LIST_PRICE_FILTER } from '@/constants/filter';
import { useGetBidderList } from '@/components/bidderList/queries';
import type { BidderListType } from 'Bid';

const BidderList = () => {
  const navigate = useNavigate();
  const auctionId = useLoaderData() as number;
  const [filterState, setFilterState] = useState(BIDDER_LIST_PRICE_FILTER.HIGH);
  const handleFilterState = () =>
    setFilterState((prev) =>
      prev.name === BIDDER_LIST_PRICE_FILTER.HIGH.name
        ? BIDDER_LIST_PRICE_FILTER.LOW
        : BIDDER_LIST_PRICE_FILTER.HIGH,
    );

  const { isLoading, productDetails } = useGetProductDetails(auctionId);
  const { isBidderListLoading, bidderList } = useGetBidderList(
    auctionId,
    filterState.sort,
  );
  if (isLoading || isBidderListLoading) return <p>Loading...</p>;
  if (!productDetails || !bidderList) return <p>Product not found</p>;
  const { img, name, startPrice, activeUserCount } = productDetails;

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate(-1)}>
        경매 참여자 목록
      </Layout.Header>
      <Layout.Main>
        <div className="flex flex-col gap-8 pt-4">
          <AuctionItem axis="row" label="입찰자 목록 상품">
            <AuctionItem.Image src={img} />
            <AuctionItem.Main
              kind="register"
              name={name}
              count={activeUserCount}
              startPrice={startPrice}
            />
          </AuctionItem>
          <div className="flex items-center justify-between">
            <h2 className="text-heading2">참여 가격</h2>
            <div
              onClick={handleFilterState}
              className="flex items-center gap-1 cursor-pointer text-body2 text-gray1"
            >
              <span>{filterState.name}</span>
              <img
                className="pb-1"
                src={filterState.icon}
                alt={filterState.name}
              />
            </div>
          </div>
          <hr className="border my-[-16px] border-gray3" />
          <ul className="flex flex-col gap-2">
            {bidderList.map((el: BidderListType, idx: number) => (
              <li
                key={el.id}
                className={`flex p-3 items-center justify-between text-gray1 ${idx === 0 && 'border border-cheeseYellow rounded-lg'}`}
              >
                <span className="text-body1">{el.nickname}</span>
                <span className="text-body1Bold">
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
          color="cheeseYellow"
          className="w-full h-full"
          aria-label="최종 판매 버튼"
        >
          최종 판매하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default BidderList;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};

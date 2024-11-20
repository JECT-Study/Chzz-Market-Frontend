import { AuctionItem, Button, formatCurrencyWithWon } from "@/shared";

import { Layout } from "@/app/layout";
import { useGetAuctionDetails } from "@/features/details";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BIDDER_LIST_PRICE_FILTER, type IBidder } from "../config";
import { useGetBidderList } from "../model/useGetBidderList";

const SettlementMain = ({ auctionId }: { auctionId: number }) => {
  const [filterState, setFilterState] = useState(BIDDER_LIST_PRICE_FILTER.HIGH);
  const navigate = useNavigate()

  const handleFilterState = () =>
    setFilterState((prev) => (prev.name === BIDDER_LIST_PRICE_FILTER.HIGH.name ? BIDDER_LIST_PRICE_FILTER.LOW : BIDDER_LIST_PRICE_FILTER.HIGH));


  const { auctionDetails } = useGetAuctionDetails(auctionId);
  const { bidderList } = useGetBidderList(auctionId);

  const filteredBidderList = filterState.sort === 'desc' ? bidderList : bidderList.sort((a, b) => a.bidAmount - b.bidAmount)
  const { images, productName, minPrice, participantCount } = auctionDetails;

  return (
    <>
      <Layout.Main>
        <div className='flex flex-col gap-8 pt-4'>
          <AuctionItem axis='row' label='입찰자 목록 상품'>
            <AuctionItem.Image src={images[0].imageUrl} />
            <AuctionItem.Main kind='register' name={productName} count={participantCount} price={minPrice} />
          </AuctionItem>
          <div className='flex items-center justify-between'>
            <h2 className='text-heading2'>참여 가격</h2>
            <div onClick={handleFilterState} className='flex items-center gap-1 cursor-pointer text-body2 text-gray1'>
              <span>{filterState.name}</span>
              <img className='pb-1' src={filterState.icon} alt={filterState.name} />
            </div>
          </div>
          <hr className='border my-[-16px] border-gray3' />
          <ul className='flex flex-col gap-2'>
            {filteredBidderList.map((el: IBidder, idx: number) => (
              <li
                key={el.bidderNickname}
                className={`flex p-3 items-center justify-between text-gray1 ${idx === 0 && 'border border-cheeseYellow rounded-lg'}`}
              >
                <span className='text-body1'>{el.bidderNickname}</span>
                <span className='text-body1Bold'>{formatCurrencyWithWon(el.bidAmount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Layout.Main>
      <Layout.Footer type='single'>
        <Button type='button' onClick={() => navigate(-1)} color='cheeseYellow' className='w-full h-full' aria-label='확인 버튼'>
          확인 완료
        </Button>
      </Layout.Footer></>
  );
}

export default SettlementMain;

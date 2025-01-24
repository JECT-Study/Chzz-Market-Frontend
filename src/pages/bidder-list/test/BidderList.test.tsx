import type { IAuctionDetails } from "@/entities";
import { auctionDetailsData, useGetAuctionDetails } from "@/features/details";
import { mockedUseNavigate } from "@/shared/api/msw/setupTests";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { useGetBidderList } from "../model";
import { BidderListMain } from "../ui/BidderListMain";
import { bidderListData } from "./data";

vi.mock('@/features/details/model', () => ({
  useGetAuctionDetails: vi.fn(),
}));

vi.mock('@/pages/bidder-list/model', () => ({
  useGetBidderList: vi.fn(),
}));

vi.mocked(useGetAuctionDetails).mockReturnValue({
  auctionDetails: auctionDetailsData[1] as IAuctionDetails,
})
vi.mocked(useGetBidderList).mockReturnValue({
  bidderList: bidderListData
});

describe('입찰자 리스트 페이지 테스트', () => {
  const setup = () => {
    const utils = render(<BidderListMain auctionId={1} />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    return {
      ...utils,
      user,
    };
  }
  test('뒤로가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const backBtn = screen.getByRole('button', {
      name: /뒤로 가기/,
    });
    await user.click(backBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  })
  test('이미지, 상품 이름, 시작가, 참여자 수, 참여자의 이름 및 입찰가를 볼 수 있다.', async () => {
    setup();

    const image = screen.getByRole('img', { name: /이미지/ })
    const name = screen.getByRole('heading', { name: /이름/ });
    const price = screen.getByLabelText(/시작가/);
    const participantCount = screen.getByLabelText(/참여자/);

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(participantCount).toBeInTheDocument();

    const dataLength = bidderListData.length;
    const list = screen.getAllByRole('listitem', { name: /입찰자 리스트 아이템/ });
    expect(list).toHaveLength(dataLength);

    const listName = screen.getAllByLabelText(/입찰자 이름/);
    const listPrice = screen.getAllByLabelText(/입찰자 입찰가/);
    expect(listName).toHaveLength(dataLength);
    expect(listPrice).toHaveLength(dataLength);
  })
  test('입찰가를 기준으로 높은 가격 순, 낮은 가격순으로 필터링할 수 있다.', async () => {
    const { user } = setup();
    const getNumber = (str: string) => Number(str.split(' ')[0].replace(/,/g, ''));
    const firstList = screen.getAllByLabelText(/입찰가/).map((el) => el.textContent) as string[]

    const firstFilterName = screen.getByLabelText(/필터 이름/);
    expect(firstFilterName).toHaveTextContent(/높은 가격/);

    const filterBtn = screen.getByRole('button', { name: /필터링 버튼/ });
    await user.click(filterBtn);

    const secondFilterName = screen.getByLabelText(/필터 이름/);
    expect(secondFilterName).toHaveTextContent(/낮은 가격/);

    const expectedList = [...firstList].sort((a, b) => getNumber(a) - getNumber(b));
    const filteredList = screen.getAllByLabelText(/입찰가/).map((el) => el.textContent) as string[]
    expect(filteredList).toEqual(expectedList);
  })

  test('확인 완료 버튼 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const btn = screen.getByRole('button', {
      name: /확인 완료/,
    });
    await user.click(btn);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  })
})
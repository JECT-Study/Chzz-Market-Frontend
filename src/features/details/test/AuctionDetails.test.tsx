import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AuctionDetailsMain, useGetAuctionDetails } from '..';

import type { IAuctionDetails } from '@/entities';
import { CATEGORIES } from '@/shared';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { useEndAuction } from '../lib';
import { useCancelBid } from '../model';
import { auctionDetailsData } from './data';

vi.mock('@/features/details/model', () => ({
  useGetAuctionDetails: vi.fn(),
  useCancelBid: vi.fn()
}));
vi.mock('@/features/details/lib', () => ({
  useEndAuction: vi.fn()
}));

vi.mocked(useEndAuction).mockReturnValue({
  endAuction: vi.fn()
});
const mockedCancelBid = vi.fn();
vi.mocked(useCancelBid).mockReturnValue({
  mutate: mockedCancelBid,
  isPending: false
});
const mockUseGetAuctionDetails = vi.mocked(useGetAuctionDetails);

describe('경매 상세 조회 테스트', () => {
  const setup = (auctionId: number) => {
    const auctionData = auctionDetailsData.find(
      (data) => data.auctionId === auctionId
    ) as IAuctionDetails;
    mockUseGetAuctionDetails.mockReturnValue({
      details: auctionData as IAuctionDetails
    });

    const utils = render(<AuctionDetailsMain auctionId={auctionId} />, {
      wrapper: BrowserRouter
    });
    const user = userEvent.setup();

    return {
      ...utils,
      user
    };
  };

  test('뒤로 가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup(0);

    const backBtn = screen.getByRole('button', {
      name: /뒤로 가기/
    });
    await user.click(backBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  describe.each(auctionDetailsData.slice(0, 3) as IAuctionDetails[])(
    '상세 조회 공통 데이터 테스트',
    ({ auctionId, timeRemaining, category }) => {
      test('이미지 최소 1장, 남은 시간, 판매자 이름 및 프로필 사진, 상품 이름, 카테고리, 시작가, 참여 금액, 참여 인원 데이터가 있다.', () => {
        setup(auctionId);

        const auctionImages = screen.getAllByRole('img', { name: /상품 사진/ });
        const time = screen.getByLabelText('남은 시간');
        const sellerName = screen.getByRole('paragraph', {
          name: /판매자 이름/
        });
        const sellerPicture = screen.getByRole('img', {
          name: /판매자 프로필 사진/
        });
        const productName = screen.getByRole('heading', { name: /상품 이름/ });
        const categoryBtn = screen.getByRole('button', { name: '카테고리' });
        const price = screen.getByLabelText(/시작가/);
        const bidPrice = screen.getByLabelText(/참여 금액/);
        const participants = screen.getByLabelText(/참여 인원/);

        expect(auctionImages.length).toBeGreaterThanOrEqual(1);
        expect(time).toBeInTheDocument();
        expect(sellerName).toBeInTheDocument();
        expect(sellerPicture).toBeInTheDocument();
        expect(productName).toBeInTheDocument();
        expect(categoryBtn).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(bidPrice).toBeInTheDocument();
        expect(participants).toBeInTheDocument();
      });

      test('1시간 미만은 빨간색, 16시간 미만은 초록색, 그 이상은 파란색으로 표시된다.', () => {
        setup(auctionId);
        const hours = Math.floor(timeRemaining / 3600);
        const barColor =
          hours < 1
            ? 'bg-timeColor1'
            : hours <= 16
              ? 'bg-timeColor2'
              : 'bg-timeColor3';
        const timeBar = screen.getByLabelText('남은 시간 막대');

        expect(timeBar).toHaveClass(barColor);
      });

      test('카테고리 클릭하면 해당 카테고리 별 목록 페이지로 이동한다.', async () => {
        const { user } = setup(auctionId);

        const categoryBtn = screen.getByRole('button', { name: '카테고리' });
        await user.click(categoryBtn);

        expect(mockedUseNavigate).toHaveBeenCalledWith(
          `/product/list?category=${CATEGORIES[category].lowerCode}`,
          { state: { category: CATEGORIES[category].value } }
        );
      });
    }
  );

  test('이미지 2장 이상이면 이전과 이후로 이동할 수 있는 버튼 존재한다.', () => {
    setup(0);

    const auctionImages = screen.getAllByRole('img', { name: /상품 사진/ });
    expect(auctionImages.length).toBeGreaterThanOrEqual(2);

    const prevBtn = screen.getByRole('button', { name: '이전 버튼' });
    const nextBtn = screen.getByRole('button', { name: '이후 버튼' });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  describe('진행 중인 경매 테스트', () => {
    test('판매자는 경매에 참여할 수 없다.', () => {
      setup(1);

      const button = screen.getByRole('button', { name: '내가 등록한 경매' });
      expect(button).toBeDisabled();
    });

    test(
      '구매자이면서 참여하지 않은 사람은 참여하기 버튼만 존재하며, 참여하기 버튼 클릭하면 입찰 페이지로 이동한다.'
    ),
      async () => {
        const { user } = setup(0);

        const { auctionId } = auctionDetailsData[0];
        const btn = screen.getByText('경매 참여하기');
        expect(btn).toBeInTheDocument();
        await user.click(btn);

        expect(mockedUseNavigate).toHaveBeenCalledWith(
          `/auctions/bid/${auctionId}`
        );
      };

    test('구매자이면서 참여한 사람은 참여 취소 버튼과 금액 수정 및 남은 횟수 버튼이 존재하며, 금액 수정 버튼 클릭하면 입찰 페이지로 이동한다.', async () => {
      const { user } = setup(3);

      const { remainingBidCount, auctionId } = auctionDetailsData[3] as IAuctionDetails
      const cancelBtn = screen.getByRole('button', { name: '참여 취소 확인' });
      const editBtn = screen.getByRole('button', { name: '금액 수정' });
      const remainCount = screen.getByText(
        `금액 수정 (${remainingBidCount}회 가능)`
      );

      expect(cancelBtn).toBeInTheDocument();
      expect(editBtn).toBeInTheDocument();
      expect(remainCount).toBeInTheDocument();

      await user.click(editBtn);
      expect(mockedUseNavigate).toHaveBeenCalledWith(
        `/auctions/bid/${auctionId}`
      );
    });

    test('구매자이면서 참여한 사람은 참여 취소 버튼이 있고, 클릭하면 확인 모달이 나오고, 취소 버튼 클릭하면 참여 취소할 수 있다.', async () => {
      const { user } = setup(3);

      const cancelBtn = screen.getByRole('button', { name: '참여 취소 확인' });
      await user.click(cancelBtn);

      const modal = screen.getByLabelText('확인 모달');
      expect(modal).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: '닫기' });
      await user.click(closeBtn);
      expect(modal).not.toBeInTheDocument();

      await user.click(cancelBtn);
      const confirmBtn = screen.getByRole('button', { name: '참여 취소' });
      await user.click(confirmBtn);

      const { bidId } = auctionDetailsData[3] as IAuctionDetails;
      expect(mockedCancelBid).toHaveBeenCalledWith(bidId);
    });

    test('한 번 참여 취소한 경매는 다시 참여하지 못한다.', async () => {
      setup(2);

      const button = screen.getByRole('button', { name: '참여 취소한 경매' });
      expect(button).toBeDisabled();
    });
  });

  describe('종료된 경매 테스트', () => {
    test('판매자인 경우 참여자 내역 보기 버튼이 있고, 참여자가 없을 경우 클릭할 수 없다.', async () => {
      setup(5);

      const btn = screen.getByRole('button', { name: /참여자 내역 보기/ });
      expect(btn).toBeDisabled();
    });
    test('판매자인 경우 참여자 내역 보기 버튼이 있고, 참여자가 있을 경우 클릭하면 참여자 내역 페이지로 이동한다.', async () => {
      const { user } = setup(6);

      const btn = screen.getByRole('button', { name: /참여자 내역 보기/ });
      await user.click(btn);

      expect(mockedUseNavigate).toHaveBeenCalledWith(
        `/auctions/${auctionDetailsData[6].auctionId}/bidder-list`
      );
    });

    test('구매자인 경우, 참여하지 않은 경매 또는 낙찰받지 못한 경매라면 종료된 경매 버튼이 있고 클릭할 수 없다.', () => {
      setup(7);
      const btn = screen.getByRole('button', { name: '종료된 경매' });

      expect(btn).toBeDisabled();
    });

    test('구매자인 경우, 낙찰받은 경매라면 결제하기 버튼이 있고, 클릭하면 결제 페이지로 이동한다.', async () => {
      const { user } = setup(8);

      const btn = screen.getByRole('button', { name: '결제하기' });
      await user.click(btn);
      expect(mockedUseNavigate).toHaveBeenCalledWith(
        `/auctions/${auctionDetailsData[8].auctionId}/payment`
      );
    });
    test('구매자인 경우 결제한 경매라면 결제 내역 버튼이 있고, 클릭하면 결제 내역 페이지로 이동한다.', () => {
      setup(9);
    });
  });
});

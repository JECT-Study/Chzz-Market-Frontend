import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import type { IAuctionDetails } from '@/entities/auction';
import { useGetAuctionDetails } from '@/features/details';
import { auctionDetailsData } from '@/features/details/test/data';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { BidForm } from '..';
import { usePostBid } from '../model';

vi.mock('@/features/details/model', () => ({
  useGetAuctionDetails: vi.fn()
}));
vi.mock('@/features/bid/model', () => ({
  usePostBid: vi.fn()
}));

const mockedPostBid = vi.fn();

vi.mocked(usePostBid).mockReturnValue({
  mutate: mockedPostBid,
  isPending: false
});

describe('입찰 및 입찰 수정 테스트', () => {
  const setup = (auctionId: number) => {
    const auctionData = auctionDetailsData.find(
      (data) => data.auctionId === auctionId
    ) as IAuctionDetails;
    vi.mocked(useGetAuctionDetails).mockReturnValue({
      details: auctionData
    });

    const utils = render(<BidForm auctionId={auctionId} />);
    const user = userEvent.setup();

    return {
      user,
      ...utils
    };
  };

  test('뒤로가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup(0);

    const backBtn = screen.getByRole('button', { name: /뒤로 가기/ });

    await user.click(backBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test('입찰 가격을 입력하고 난 후, focus를 벗어날 시 가격을 천 단위로 나누고 원을 붙인다.', async () => {
    const { user } = setup(0);

    const costInput = screen.getByLabelText('가격 제안하기');
    await user.type(costInput, '120000');

    act(() => costInput.blur());
    await waitFor(() => {
      expect(costInput).toHaveDisplayValue('120,000 원');
    });

    act(() => costInput.focus());
    await waitFor(() => {
      expect(costInput).toHaveDisplayValue('120000');
    });
  });

  describe('입찰 테스트', () => {
    test('경매 상품에 사진, 이름, 시작가, 참여자, 시간을 표시한다.', async () => {
      setup(0);

      const imgElement = screen.getByRole('img', { name: '이미지' });
      const nameElement = screen.getByLabelText('이름');
      const timeElement = screen.getByLabelText('시간');
      const priceElement = screen.getByLabelText('시작가');
      const userElement = screen.getByLabelText('참여자');

      expect(imgElement).toBeInTheDocument();
      expect(nameElement).toBeInTheDocument();
      expect(timeElement).toBeInTheDocument();
      expect(priceElement).toBeInTheDocument();
      expect(userElement).toBeInTheDocument();
    });

    test('제안하기 버튼이 있으며, 입찰 가격 입력 후 주의 사항을 체크해야 제안할 수 있다.', async () => {
      const { user } = setup(0);

      const submitBtn = screen.getByRole('button', { name: '제안하기' });
      const costInput = screen.getByLabelText('가격 제안하기');
      await user.type(costInput, '120000');

      const checkbox = screen.getByRole('checkbox', {
        name: '체크박스'
      });
      await user.click(checkbox);
      expect(submitBtn).toBeEnabled();

      await user.click(submitBtn);
      expect(mockedPostBid).toHaveBeenCalledWith({
        auctionId: 0,
        bidAmount: 120000
      });
    });

    test('시작가보다 높은 금액을 입력해야 한다.', async () => {
      const { user } = setup(0);

      const submitBtn = screen.getByRole('button', { name: '제안하기' });
      const costInput = screen.getByLabelText('가격 제안하기');
      await user.type(costInput, '20000');

      const checkbox = screen.getByRole('checkbox', {
        name: '체크박스'
      });
      await user.click(checkbox);
      expect(submitBtn).toBeEnabled();

      await user.click(submitBtn);
      const errorMessage = screen.getByText(/시작가보다 높은 금액을 입력/);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('입찰 수정 테스트', () => {
    test('경매 상품에 사진, 이름, 시작가, 참여자, 시간, 나의 참여 금액을 표시한다.', async () => {
      setup(3);

      const imgElement = screen.getByRole('img', { name: '이미지' });
      const nameElement = screen.getByLabelText('이름');
      const timeElement = screen.getByLabelText('시간');
      const priceElement = screen.getByLabelText('시작가');
      const userElement = screen.getByLabelText('참여자');
      const bidAmount = screen.getByLabelText('나의 참여 금액');

      expect(imgElement).toBeInTheDocument();
      expect(nameElement).toBeInTheDocument();
      expect(timeElement).toBeInTheDocument();
      expect(priceElement).toBeInTheDocument();
      expect(userElement).toBeInTheDocument();
      expect(bidAmount).toBeInTheDocument();
    });

    test('금액 수정 버튼이 있으며. 입찰 가격 입력 후 주의 사항을 체크해야 금액을 수정할 수 있다.', async () => {
      const { user } = setup(3);

      const submitBtn = screen.getByRole('button', { name: /수정하기/ });
      const costInput = await screen.findByLabelText('가격 제안하기');
      await user.type(costInput, '240000');

      const checkbox = screen.getByRole('checkbox', {
        name: '체크박스'
      });
      await user.click(checkbox);
      expect(submitBtn).toBeEnabled();

      await user.click(submitBtn);
      expect(mockedPostBid).toHaveBeenCalledWith({
        auctionId: 3,
        bidAmount: 240000
      });
    });

    test('나의 참여 금액과 다른 금액 입력해야 한다.', async () => {
      const { user } = setup(3);

      const { bidAmount } = auctionDetailsData[3] as IAuctionDetails;
      const submitBtn = await screen.findByRole('button', { name: '수정하기' });
      const costInput = await screen.findByLabelText('가격 제안하기');
      await user.type(costInput, bidAmount.toString());

      const checkbox = await screen.findByRole('checkbox', {
        name: '체크박스'
      });
      await user.click(checkbox);
      expect(submitBtn).toBeEnabled();

      await user.click(submitBtn);

      const errorMessage =
        screen.getByText(/현재 참여 금액과 다른 금액을 입력/);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

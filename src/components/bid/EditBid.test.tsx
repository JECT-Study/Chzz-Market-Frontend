import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import Bid from '@/pages/Bid';
import { bidProductData } from '@/mocks/data/bidProductData';
import { mockedUseNavigate } from '@/setupTests';
import { useGetBidProductDetails } from '@/components/bid/queries';
import userEvent from '@testing-library/user-event';

vi.mock('@/components/bid/queries');

vi.mocked(useGetBidProductDetails).mockReturnValue({
  isLoading: false,
  productDetails: bidProductData[1],
});
const router = createMemoryRouter(
  [
    {
      path: '/bid/:auctionId',
      element: <Bid isParticipating />,
      loader: () => 2,
    },
  ],
  {
    initialEntries: ['/bid/1'],
  },
);

describe('입찰가 수정 테스트', () => {
  const setup = () => {
    const utils = render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  test('타이틀은 금액 수정하기이며, 뒤로가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const title = await screen.findByRole('heading', { name: /금액 수정하기/ });
    const backBtn = await screen.findByRole('button', { name: /뒤로 가기/ });

    await user.click(backBtn);

    expect(title).toBeInTheDocument();
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test('참여 취소 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const cancelBtn = await screen.findByRole('button', { name: /참여 취소/ });

    await user.click(cancelBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test('경매 상품에 사진, 이름, 시작가, 경매 참여자 수, 남은 시간을 표시하고, 나의 참여 금액이 존재한다.', async () => {
    render(<RouterProvider router={router} />);

    const item = await screen.findByRole('figure', { name: /입찰 상품/ });

    const imgElement = screen.getByRole('img', { name: '이미지' });
    expect(item).toContainElement(imgElement);

    const nameElement = screen.getByLabelText('이름');
    expect(nameElement).toHaveTextContent('[나이키] 조던 블랙');
    expect(item).toContainElement(nameElement);

    const timeElement = screen.getByLabelText('남은 시간');
    expect(timeElement).toHaveTextContent('7시간 남음');
    expect(timeElement).toHaveClass('text-timeColor2 border-timeColor2');
    expect(item).toContainElement(timeElement);

    const priceElement = screen.getByLabelText('시작 가격');
    expect(priceElement).toHaveTextContent('120,000원');
    expect(item).toContainElement(priceElement);

    const userElement = screen.getByLabelText('참여자');
    expect(userElement).toHaveTextContent('참여자 8명');
    expect(item).toContainElement(userElement);

    const bidAmount = await screen.findByLabelText('나의 참여 금액');
    expect(bidAmount).toHaveTextContent('130,000 원');
  });

  test('입찰 가격을 입력하고 난 후, focus를 벗어날 시 가격을 천 단위로 나누고 원을 붙인다.', async () => {
    const { user } = setup();

    const costInput = await screen.findByLabelText('가격 제안하기');
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

  test('입찰 가격 입력 후 주의 사항을 체크해야 금액 수정을 클릭할 수 있고, 제안이 완료되면 상세 페이지로 이동한다.', async () => {
    const { user } = setup();

    const submitBtn = await screen.findByRole('button', {
      name: '금액 수정(2회 가능)',
    });
    const costInput = await screen.findByLabelText('가격 제안하기');
    await user.type(costInput, '120000');

    expect(submitBtn).toBeDisabled();

    const checkbox = screen.getByRole('checkbox', {
      name: '주의사항 체크박스',
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(submitBtn).toBeEnabled();

    await user.click(submitBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/product/2');
  });

  test('입찰 가격 유효성 검사.', async () => {
    const { user } = setup();

    const submitBtn = await screen.findByRole('button', { name: /금액 수정/ });
    const costInput = await screen.findByLabelText('가격 제안하기');
    await user.type(costInput, '500');

    expect(submitBtn).toBeDisabled();

    const checkbox = await screen.findByRole('checkbox', {
      name: '주의사항 체크박스',
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(submitBtn).toBeEnabled();

    await user.click(submitBtn);

    const errorMessage = screen.getByText('최소 1000원 이상 입력해 주세요.');
    expect(errorMessage).toBeInTheDocument();
  });
});

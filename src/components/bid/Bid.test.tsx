import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import Bid from '@/pages/Bid';
import { mockedUseNavigate } from '@/setupTests';
import userEvent from '@testing-library/user-event';
import { auctionDetailsData } from '@/mocks/data/auctionDetailsData';
import { useGetAuctionDetails } from '../details/queries';

vi.mock('@/components/details/queries');
vi.mocked(useGetAuctionDetails).mockReturnValue({
  auctionDetails: auctionDetailsData[0],
});

/**
 * createMemoryRouter는 메모리에 상태를 저장하는 라우터이다.
 * 브라우저의 주소 표시줄을 조작하지 않고 메모리 내에서 경로를 관리한다 => 불필요한 사이드 이펙트 줄인다.
 * 주로 테스트 환경에서 사용되며, 브라우저 환경에서의 라우팅을 모방하여 경로와 컴포넌트를 관리한다.
 */
const router = createMemoryRouter(
  [
    {
      path: '/auctions/bid/:auctionId',
      element: <Bid />,
      loader: () => 0,
    },
  ],
  {
    initialEntries: ['/auctions/bid/0'],
  },
);
describe('입찰 테스트', () => {
  const setup = () => {
    const utils = render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  test('타이틀은 경매 참여하기 이며, 뒤로가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const title = await screen.findByRole('heading', { name: /경매 참여하기/ });
    const backBtn = await screen.findByRole('button', { name: /뒤로 가기/ });

    await user.click(backBtn);

    expect(title).toBeInTheDocument();
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test('경매 상품에 사진, 이름, 시작가, 참여자, 시간을 표시한다.', async () => {
    render(<RouterProvider router={router} />);

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

  test('입찰 가격 입력 후 주의 사항을 체크해야 제안하기를 클릭할 수 있고, 제안이 완료되면 상세 페이지로 이동한다.', async () => {
    const { user } = setup();

    const submitBtn = await screen.findByRole('button', { name: '제안하기' });
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
    expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/0');
  });

  test('입찰 가격 유효성 검사', async () => {
    const { user } = setup();

    const submitBtn = await screen.findByRole('button', { name: '제안하기' });
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

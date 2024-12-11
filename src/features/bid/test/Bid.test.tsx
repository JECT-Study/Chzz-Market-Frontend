import { act, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

import { useGetAuctionDetails } from '@/features/details';
import { Bid } from '@/pages/bid';
import { mockedUseNavigate } from '@/shared/test/setupTests';
import userEvent from '@testing-library/user-event';

vi.mock('@/components/details/queries');
vi.mocked(useGetAuctionDetails).mockReturnValue({
  auctionDetails: {
    bidAmount: 0,
    bidId: null,
    description:
      "서로 다른 출신과 개성을 가진 이들이 모여 밴드 결성까지의 과정을 보여준 ‘Harmony from Discord’부터 멤버들 간의 만남을 동경과 벅차오르는 감성으로 담아낸 ‘MANITO’까지. 성장 서사를 써내려가는 밴드 QWER이 두 번째 EP인 ‘Algorithm’s Blossom’을 선보인다. 이번 앨범에서는 QWER이라는 하나의 팀으로서 새롭게 운명을 개척해나가는 이야기를 ‘알고리즘이 피워낸 꽃’이라는 키워드를 통해 풀어내고자 한다.\n\n\"사랑과 상처, 그 모든 것을 끌어안고 피어나”\n\n무수히 파편적이고 혼란하지만 보여지는 것은 단편적인 곳, 다양한 혼잡함이 가지런히 질서를 이루는 곳. 그런 '알고리즘' 속에서 우리의 이야기를 피워낸다. ‘Algorithm’s Blossom'에서 QWER은 보편적이지 않은 공간에 심겨진 씨앗으로, 동시에 사랑과 상처를 양분삼아 돋아난 싹으로, 세상에 보인 적 없던 새로운 꽃의 모습으로 자신들의 성장과 여정을 그린다.",
    images: [{ imageId: 1, imageUrl: '/jgbI75.jpg' }],
    isCancelled: false,
    isParticipated: false,
    isSeller: false,
    minPrice: 23000,
    auctionName: 'qwer 미니 2집',
    participantCount: 4,
    auctionId: 14,
    remainingBidCount: 0,
    sellerNickname: 'aaron93',
    status: 'PROCEEDING',
    timeRemaining: 25816,
    category: 'ELECTRONICS',
    sellerProfileImageUrl: '',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
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
  }
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
      name: '체크박스',
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
      name: '체크박스',
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(submitBtn).toBeEnabled();

    await user.click(submitBtn);

    const errorMessage = screen.getByText('최소 1000원 이상 입력해 주세요.');
    expect(errorMessage).toBeInTheDocument();
  });
});

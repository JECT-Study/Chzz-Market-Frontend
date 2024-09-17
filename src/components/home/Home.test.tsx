import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import userEvent from '@testing-library/user-event';
import { mockedUseNavigate } from '@/setupTests';
import { notificationData } from '@/mocks/data/notificationData';
import {
  bestAuctions,
  imminentAuctions,
  preRegisterAuctions,
} from '@/mocks/data/homeAuctionsData';
import { getTimeColor } from '@/utils/getTimeColor';
import { useGetNotifications } from '../notification/queries';
import { useGetHomeAuctions } from './queries';
import NavigationLayout from '../layout/NavigationLayout';

// vi.mock을 사용해 특정 모듈을 모킹할 수 있다.
// 실제로 useGetBestAuctions 함수를 실행하는 대신, 원하는 반환값을 제공하는 모의 함수를 제공한다는 뜻
//  @/components/home/queries에서 불러오는 모든 함수들을 모킹
vi.mock('@/components/home/queries');

// 모듈을 모킹한 후, 우리는 각 함수가 어떤 값을 반환할지 정의
// 모킹을 통해 설정한 반환값은 실제로 테스트를 진행할 때, 컴포넌트가 이 훅에서 데이터를 가져오는 것처럼 작동하게 합니다. 이 과정에서 API 요청이 발생하지 않으며, 데이터가 항상 일관되게 제공됩니다.
vi.mocked(useGetHomeAuctions).mockReturnValue({
  bestAuctions,
  imminentAuctions,
  preRegisterAuctions,
});

vi.mock('@/components/notification/queries');

vi.mocked(useGetNotifications).mockReturnValue({
  notifications: notificationData,
});

describe('Home 테스트', () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<NavigationLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  describe('경매 상품 테스트', () => {
    test('경매 상품을 클릭하면 경매 상세 페이지로 이동한다.', async () => {
      const { user } = setup();

      // 이 코드에서는 await을 사용해 findByRole이 요소를 찾을 때까지 기다린다. 이는 비동기적으로 로딩된 데이터를 처리하는 데 유용
      const bestAuctionsData = await screen.findAllByRole('figure', {
        name: /register/,
      });
      const firstBestAuctionsData = bestAuctionsData[0];

      await user.click(firstBestAuctionsData);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/auction/0');
    });

    test('사전 경매 상품을 클릭하면 사전 경매 상세 페이지로 이동한다.', async () => {
      const { user } = setup();

      const preRegisterAuctionsData = await screen.findAllByRole('figure', {
        name: /pre-register/,
      });

      const firstPreRegisterAuction = preRegisterAuctionsData[0];

      await user.click(firstPreRegisterAuction);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/pre-auction/0');
    });

    describe('경매 시간은 남은 시간에 따라 다른 색으로 표시한다.', () => {
      test('8시간 미만일 경우 빨간색으로 표시한다.', async () => {
        const time = 1;

        const color = getTimeColor(time);

        expect(color).toBe(' text-timeColor1 border-timeColor1');
      });

      test('16시간 미만일 경우 주황색으로 표시한다.', async () => {
        const time = 14;

        const color = getTimeColor(time);

        expect(color).toBe(' text-timeColor2 border-timeColor2');
      });

      test('24시간 미만일 경우 초록색으로 표시한다.', async () => {
        const time = 23;

        const color = getTimeColor(time);

        expect(color).toBe(' text-timeColor3 border-timeColor3');
      });
    });
  });

  test('우측 하단 + 버튼을 클릭하면 경매 등록 페이지로 이동한다.', async () => {
    const { user } = setup();

    const plusBtn = screen.getByLabelText(/plus_icon/);
    expect(plusBtn).toBeInTheDocument();

    await user.click(plusBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith(`/auctions/register`);
  });

  test('카테고리가 총 8개 있고, 전자기기를 클릭하면 전자기기 별 항목 페이지로 이동한다.', async () => {
    const { user } = setup();

    const electronicsImage = await screen.findByRole('img', {
      name: /전자기기/,
    });

    await user.click(electronicsImage);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`/auctions/register`);
  });

  describe('네비게이션 테스트', () => {
    test('홈 버튼은 색깔있는 아이콘이어야 하며, 클릭해도 여전히 홈이다.', async () => {
      const { user } = setup();

      const homeIcon = screen.getByRole('img', { name: /home_on_icon/ });

      await user.click(homeIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });

    test('알림 버튼은 색깔없는 아이콘이어야 하며, 클릭해도 알림페이지로 이동한다.', async () => {
      const { user } = setup();

      const noticeIcon = screen.getByRole('img', {
        name: /notification_off_icon/,
      });

      await user.click(noticeIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/notification');
    });

    test('좋아요 버튼은 색깔없는 아이콘이어야 하며, 클릭해도 좋아요페이지로 이동한다.', async () => {
      const { user } = setup();

      const heartIcon = screen.getByRole('img', { name: /heart_off_icon/ });

      await user.click(heartIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/heart');
    });

    test('마이 버튼은 색깔없는 아이콘이어야 하며, 클릭해도 마이페이지로 이동한다.', async () => {
      const { user } = setup();

      const myIcon = screen.getByRole('img', { name: /user_off_icon/ });

      await user.click(myIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/user');
    });
  });
});

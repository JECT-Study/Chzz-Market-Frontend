import { notificationData, useGetNotificationList } from '@/features/notification';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { useGetBestAuctions, useGetImminentAuctions, useGetPreAuctions } from '../model';
import { bestAuctionsData, imminentAuctionsData, preAuctionsData } from './data';

import { LayoutWithNav } from '@/app/layout';
import { getTimeColor } from '@/shared';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { Home } from '../ui';

// vi.mock을 사용해 특정 모듈을 모킹할 수 있다.
vi.mock('@/pages/home/model');
vi.mock('@/features/notification/model');

// 모듈을 모킹한 후, 우리는 각 함수가 어떤 값을 반환할지 정의
// 모킹을 통해 설정한 반환값은 실제로 테스트를 진행할 때, 컴포넌트가 이 훅에서 데이터를 가져오는 것처럼 작동하게 한다. 
// 이 과정에서 API 요청이 발생하지 않으며, 데이터가 항상 일관되게 제공된다.
vi.mocked(useGetBestAuctions).mockReturnValue({
  bestAuctions: bestAuctionsData,
});
vi.mocked(useGetImminentAuctions).mockReturnValue({
  imminentAuctions: imminentAuctionsData,
});
vi.mocked(useGetPreAuctions).mockReturnValue({
  preAuctions: preAuctionsData,
});
vi.mocked(useGetNotificationList).mockReturnValue({
  notificationList: notificationData,
});

describe('Home 테스트', () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<LayoutWithNav />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </MemoryRouter>
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

      const mockData = await screen.findAllByRole('figure', {
        name: /best/,
      });
      await user.click(mockData[0]);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/auction/0');
    });

    test('경매 상품이 없으면 경매 없음 문구를 보여준다.', async () => {
      setup();

      const emptyMessage = await screen.findByLabelText(/empty/);
      expect(emptyMessage).toBeInTheDocument();
    })

    test('사전 경매 상품을 클릭하면 사전 경매 상세 페이지로 이동한다.', async () => {
      const { user } = setup();

      const mockData = await screen.findAllByRole('figure', {
        name: /preAuction/,
      });
      await user.click(mockData[0]);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/pre-auction/0');
    });

    describe('경매 시간은 남은 시간에 따라 다른 색으로 표시한다.', () => {
      const expectColor = (time: number) => {
        const colorNumber = time < 8 ? 1 : time < 16 ? 2 : 3;
        return ` text-timeColor${colorNumber} border-timeColor${colorNumber}`
      }

      test('8시간 미만일 경우 빨간색으로 표시한다.', async () => {
        const time = 1;
        const color = getTimeColor(time);

        expect(color).toBe(expectColor(time));
      });

      test('16시간 미만일 경우 주황색으로 표시한다.', async () => {
        const time = 14;
        const color = getTimeColor(time);

        expect(color).toBe(expectColor(time));
      });

      test('24시간 미만일 경우 초록색으로 표시한다.', async () => {
        const time = 23;
        const color = getTimeColor(time);

        expect(color).toBe(expectColor(time));
      });
    });
  });

  test('우측 하단 경매 등록 버튼을 클릭하면 경매 등록 페이지로 이동한다.', async () => {
    const { user } = setup();

    const plusBtn = screen.getByLabelText(/plus_icon/);
    expect(plusBtn).toBeInTheDocument();

    await user.click(plusBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith(`/auctions/register`);
  });

  test('카테고리가 총 8개 있고, 전자기기를 클릭하면 전자기기 별 항목 페이지로 이동한다.', async () => {
    const { user } = setup();

    const electronicsCategory = await screen.findByRole('listitem', {
      name: /electronics/,
    });
    await user.click(electronicsCategory);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/product/list?category=electronics', { state: { category: '전자기기' } });
  });

  describe('Navigation Test', () => {
    test('홈 버튼은 색 있는 아이콘이며 클릭해도 여전히 홈이다.', async () => {
      const { user } = setup();

      const homeIcon = screen.getByRole('img', { name: /home_on_icon/ });
      await user.click(homeIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });

    test('알림 버튼은 색 없는 아이콘이며, 클릭하면 알림 페이지로 이동한다.', async () => {
      const { user } = setup();

      const noticeIcon = screen.getByRole('img', {
        name: /notification_off_icon/,
      });
      await user.click(noticeIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/notification');
    });

    test('찜 목록 버튼은 색 없는 아이콘이어야 하며, 클릭하면 찜 목록 페이지로 이동한다.', async () => {
      const { user } = setup();

      const heartIcon = screen.getByRole('img', { name: /heart_off_icon/ });
      await user.click(heartIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/heart');
    });

    test('유저 버튼은 색 없는 아이콘이어야 하며, 클릭하면 유저 페이지로 이동한다.', async () => {
      const { user } = setup();

      const myIcon = screen.getByRole('img', { name: /user_off_icon/ });
      await user.click(myIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/user');
    });
  });
});

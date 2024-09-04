import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  bestProducts,
  deadlineProducts,
  preEnrollProducts,
} from '@/mocks/data/homeProductsData';
import { render, screen } from '@testing-library/react';
import {
  useGetBestProducts,
  useGetDeadlineProducts,
  useGetPreEnrollProducts,
} from '@/components/home/queries';

import { BrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import userEvent from '@testing-library/user-event';
import { mockedUseNavigate } from '@/setupTests';
import { notificationData } from '@/mocks/data/notificationData';
import { useGetNotifications } from '../notification/queries';

// vi.mock을 사용해 특정 모듈을 모킹할 수 있다.
// 실제로 useGetBestProducts 함수를 실행하는 대신, 원하는 반환값을 제공하는 모의 함수를 제공한다는 뜻
//  @/components/home/queries에서 불러오는 모든 함수들을 모킹
vi.mock('@/components/home/queries');

// 모듈을 모킹한 후, 우리는 각 함수가 어떤 값을 반환할지 정의
// 모킹을 통해 설정한 반환값은 실제로 테스트를 진행할 때, 컴포넌트가 이 훅에서 데이터를 가져오는 것처럼 작동하게 합니다. 이 과정에서 API 요청이 발생하지 않으며, 데이터가 항상 일관되게 제공됩니다.
vi.mocked(useGetBestProducts).mockReturnValue({
  isBestLoading: false, // 로딩 완료 상태로 설정
  bestItems: bestProducts,
});
vi.mocked(useGetDeadlineProducts).mockReturnValue({
  isDeadlineLoading: false, // 로딩 완료 상태로 설정
  deadlineItems: deadlineProducts,
});
vi.mocked(useGetPreEnrollProducts).mockReturnValue({
  isPreEnrollLoading: false, // 로딩 완료 상태로 설정
  preEnrollItems: preEnrollProducts,
});

vi.mock('@/components/notification/queries');

vi.mocked(useGetNotifications).mockReturnValue({
  isLoading: false,
  notifications: notificationData,
});

describe('Home 테스트', () => {
  const setup = () => {
    const utils = render(<Home />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  describe('경매 상품 테스트', () => {
    test('경매 상품에 사진, 이름, 남은 시간, 경매 참여자 수, 시작 가격을 표시하고 클릭하면 상품 상세 페이지로 이동한다.', async () => {
      const { user } = setup();

      // 이 코드에서는 await을 사용해 findByRole이 요소를 찾을 때까지 기다린다. 이는 비동기적으로 로딩된 데이터를 처리하는 데 유용
      const bestItems = await screen.findAllByRole('figure', { name: /best/ });

      const firstBestItems = bestItems[0];
      // 이미지 확인
      const imgElement = screen.getByRole('img', {
        name: '0_img_best',
      });
      expect(firstBestItems).toContainElement(imgElement);

      // 이름 확인
      const nameElement = screen.getByLabelText('0_name_best');
      expect(nameElement).toHaveTextContent('[나이키] 에어 조던 로우');
      expect(firstBestItems).toContainElement(nameElement);

      // 남은 시간 확인
      const timeElement = screen.getByLabelText('0_timeLeft_best');
      expect(timeElement).toHaveTextContent('14시간 남음');
      expect(firstBestItems).toContainElement(timeElement);

      // 시작 가격 확인
      const priceElement = screen.getByLabelText('0_startPrice_best');
      expect(priceElement).toHaveTextContent('100,000원');
      expect(firstBestItems).toContainElement(priceElement);

      // 참여자 수 확인
      const userElement = screen.getByLabelText('0_activeUserCount_best');
      expect(userElement).toHaveTextContent('참여자 11명');
      expect(firstBestItems).toContainElement(userElement);

      await user.click(firstBestItems);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/products/1');
    });

    test('사전 등록 상품에 사진, 이름, 시작 가격을 표시하고 클릭하면 상품 상세 페이지로 이동한다.', async () => {
      const { user } = setup();

      const preEnrollItems = await screen.findAllByRole('figure', {
        name: /pre_enroll/,
      });

      const firstPreEnrollItem = preEnrollItems[0];

      // 이미지 확인
      const imgElement = screen.getByRole('img', {
        name: '0_img_pre_enroll',
      });
      expect(firstPreEnrollItem).toContainElement(imgElement);

      // 이름 확인
      const nameElement = screen.getByLabelText('0_name_pre_enroll');
      expect(nameElement).toHaveTextContent('[뉴발란스] 993');
      expect(firstPreEnrollItem).toContainElement(nameElement);

      // 시작 가격 확인
      const priceElement = screen.getByLabelText('0_startPrice_pre_enroll');
      expect(priceElement).toHaveTextContent('230,000원');
      expect(firstPreEnrollItem).toContainElement(priceElement);

      await user.click(firstPreEnrollItem);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/products/1');
    });

    test('mock data 개수의 경매 상품이 렌더링 된다.', async () => {
      render(<Home />, { wrapper: BrowserRouter });

      // 베스트 경매 상품
      const bestImages = await screen.findAllByRole('img', { name: /best/ });

      // 마감 임박 경매 상품
      const deadlineImages = await screen.findAllByRole('img', {
        name: /deadline/,
      });

      // 사전 등록 상품
      const preEnrollImages = await screen.findAllByRole('img', {
        name: /pre_enroll/,
      });

      expect(bestImages).toHaveLength(5);
      expect(preEnrollImages).toHaveLength(5);
      expect(deadlineImages).toHaveLength(5);
    });

    describe('경매 시간은 남은 시간에 따라 다른 색으로 표시한다.', () => {
      test.only('8시간 미만일 경우 빨간색으로 표시한다.', async () => {
        render(<Home />, { wrapper: BrowserRouter });

        const bestItems = await screen.findAllByRole('figure', {
          name: /best/,
        });

        // 7시간 남은 경매 상품
        const redTimeItem = bestItems[1];

        const redTimeElement = screen.getByLabelText('1_timeLeft_best');
        expect(redTimeItem).toContainElement(redTimeElement);
        expect(redTimeElement).toHaveClass('text-timeColor2 border-timeColor2');
      });

      test('16시간 미만일 경우 주황색으로 표시한다.', async () => {
        render(<Home />, { wrapper: BrowserRouter });

        const bestItems = await screen.findAllByRole('figure', {
          name: /best/,
        });

        // 14시간 남은 경매 상품
        const orangeTimeItem = bestItems[0];

        const orangeTimeElement = screen.getByLabelText('0_timeLeft_best');
        expect(orangeTimeItem).toContainElement(orangeTimeElement);
        expect(orangeTimeElement).toHaveClass(
          'text-timeColor2 border-timeColor2',
        );
      });

      test('24시간 미만일 경우 초록색으로 표시한다.', async () => {
        render(<Home />, { wrapper: BrowserRouter });

        const bestItems = await screen.findAllByRole('figure', {
          name: /best/,
        });

        // 7시간 남은 경매 상품
        const greenTimeItem = bestItems[2];

        const greenTimeElement = screen.getByLabelText('2_timeLeft_best');
        expect(greenTimeItem).toContainElement(greenTimeElement);
        expect(greenTimeElement).toHaveClass(
          'text-timeColor3 border-timeColor3',
        );
      });
    });
  });

  test('우측 하단 + 버튼을 클릭하면 경매 등록 페이지로 이동한다.', async () => {
    const { user } = setup();

    const plusBtn = screen.getByLabelText(/plus_icon/);
    expect(plusBtn).toBeInTheDocument();

    await user.click(plusBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/register');
  });

  test('카테고리가 총 8개 있고, 전자기기를 클릭하면 전자기기 별 항목 페이지로 이동한다.', async () => {
    const { user } = setup();

    const electronicsImage = await screen.findByRole('img', {
      name: /전자기기/,
    });

    await user.click(electronicsImage);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`/register`);
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

      const myIcon = screen.getByRole('img', { name: /my_off_icon/ });

      expect(myIcon).toHaveAttribute('alt', 'my_off_icon');

      await user.click(myIcon);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/mypage');
    });
  });
});

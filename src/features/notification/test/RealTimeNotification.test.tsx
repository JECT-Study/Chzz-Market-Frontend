import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { GlobalLayout } from "@/app/layout";
import { store } from '@/app/store';
import { mockedUseNavigate } from '@/shared/test/setupTests';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { realTimeNotificationData } from '.';
import { useReadNotification, useSSE } from '../model';

vi.mock('@/features/notification/model', () => ({
  useReadNotification: vi.fn(),
  useSSE: vi.fn(),
}));

const mutateReadMock = vi.fn();
vi.mocked(useReadNotification).mockReturnValue({
  mutate: mutateReadMock,
});

describe('Layout 알림 테스트', () => {
  const mockSetState = vi.fn();

  beforeEach(() => {
    vi.mocked(useSSE).mockReturnValue({
      state: realTimeNotificationData.map((messageString) => {
        const dataMatch = messageString.match(/data:(.*)\n/);
        if (dataMatch && dataMatch[1]) {
          return JSON.parse(dataMatch[1].trim());
        }
        return null;
      }).filter(notification => notification !== null),
      setState: mockSetState,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <GlobalLayout />
      </Provider>);
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  test('실시간 알림이 도착하면 전체 화면에 알림 모달이 발생하고, 그 안에 제목, 메시지, 버튼이 존재한다.', async () => {
    setup()

    const popup = await screen.findByLabelText(/알림 박스/);

    const title = screen.getByRole('heading', { name: /제목/ });
    const message = screen.getByLabelText(/메시지/);
    const button = screen.getByRole('button', {
      name: /경매 참여자 목록 보러가기/,
    });

    expect(popup).toContainElement(title);
    expect(popup).toContainElement(message);
    expect(popup).toContainElement(button);
  });

  test('모달이 발생하고 바깥 배경을 클릭하면 모달이 사라진다.', async () => {
    const { user } = setup();

    const popup = await screen.findByLabelText(/알림 박스/);

    const popupBackground = screen.getByLabelText('모달 배경');
    await user.click(popupBackground);

    await waitFor(() => {
      expect(popup).not.toBeInTheDocument();
    });
  });

  describe('알림의 종류에 따라 알림 확인 여부를 달리한다.', () => {
    test(
      '모달 버튼이 확인 버튼인 경우 버튼 클릭시 모달이 사라진다.', { timeout: 8000 }, async () => {
        const { user } = setup();

        const firstPopup = await screen.findByLabelText(/알림 박스/);

        const popupBackground = screen.getByLabelText('모달 배경');
        await user.click(popupBackground);

        await waitFor(() => {
          expect(firstPopup).not.toBeInTheDocument();
        });
      },
    );

    test('모달 버튼이 아닌 확인 버튼이 아닌 경우, 버튼 클릭시 특정 화면으로 이동한다.', async () => {
      const { user } = setup();

      await screen.findByLabelText(/알림 박스/);

      const button = screen.getByRole('button', {
        name: /경매 참여자 목록 보러가기/,
      });
      await user.click(button);

      expect(mockedUseNavigate).toHaveBeenCalledOnce();
    });
  });

  test(
    '알림 확인 도중 또 다른 실시간 알림 발생시 모달을 닫자마자 새로운 모달이 발생한다.', async () => {
      const { user } = setup();

      await screen.findByLabelText(/알림 박스/);

      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
      });

      const button = screen.getByRole('button', {
        name: /경매 참여자 목록 보러가기/,
      });
      await user.click(button);

      const box = await screen.findByLabelText(/박스/);
      expect(box).toBeInTheDocument();
    },
  );
});

import { act, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';

import { realTimeNotificationData } from '@/mocks/data/realTimeNotificationData';
import { mockedUseNavigate } from '@/setupTests';
import { store } from '@/store';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useReadNotification } from '../notification/queries';
import GlobalLayout from './GlobalLayout';

vi.mock('@/components/notification/queries', () => ({
  useReadNotification: vi.fn(),
}));

const mutateReadMock = vi.fn();
vi.mocked(useReadNotification).mockReturnValue({
  mutate: mutateReadMock,
});

describe('Layout 알림 테스트', () => {
  // 테스트 시작 전에 EventSource 모킹
  beforeAll(() => {
    global.EventSource = vi.fn(() => ({
      addEventListener: vi.fn((event, callback) => {
        if (event === 'notification') {
          realTimeNotificationData.forEach((messageString, idx) => {
            const dataMatch = messageString.match(/data:(.*)\n/);
            if (dataMatch && dataMatch[1]) {
              const message = JSON.parse(dataMatch[1].trim()); // 문자열을 객체로 변환
              setTimeout(() => {
                callback({ data: JSON.stringify(message) }); // JSON 문자열로 다시 전송
              }, [1000, 4000, 7000][idx]);
            }
          });
        }
      }),
      close: vi.fn(),
    })) as unknown as typeof EventSource;
  });

  const setup = () => {
    const utils = render(<Provider store={store}>
      <GlobalLayout />
    </Provider>);
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  test('실시간 알림이 도착하면 전체 화면에 알림 모달이 발생하고, 그 안에 제목, 메시지, 버튼이 존재한다.', async () => {
    render(<Provider store={store}>
      <GlobalLayout />
    </Provider>);

    const popup = await screen.findByLabelText(
      /알림 박스/,
      {},
      { timeout: 5000 },
    );

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

    const popup = await screen.findByLabelText(
      /알림 박스/,
      {},
      { timeout: 1100 },
    );

    const popupBackground = screen.getByLabelText('모달 배경');
    await user.click(popupBackground);

    expect(popup).not.toBeInTheDocument();
  });

  describe('알림의 종류에 따라 알림 확인 여부를 달리한다.', () => {
    test(
      '모달 버튼이 확인 버튼인 경우 버튼 클릭시 모달이 사라진다.',
      { timeout: 8000 },
      async () => {
        const { user } = setup();

        // 이전 모달 삭제
        const popup = await screen.findByLabelText(
          /알림 박스/,
          {},
          { timeout: 1100 },
        );
        const popupBackground = screen.getByLabelText('모달 배경');
        await user.click(popupBackground);

        await act(async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 3000);
          });
        });

        const button = screen.getByRole('button', {
          name: /확인/,
        });
        await user.click(button);

        expect(popup).not.toBeInTheDocument();
      },
    );

    test('모달 버튼이 아닌 확인 버튼이 아닌 경우, 버튼 클릭시 특정 화면으로 이동한다.', async () => {
      const { user } = setup();

      await screen.findByLabelText(/알림 박스/, {}, { timeout: 1100 });

      const button = screen.getByRole('button', {
        name: /경매 참여자 목록 보러가기/,
      });
      await user.click(button);

      expect(mockedUseNavigate).toHaveBeenCalledOnce();
    });
  });

  test(
    '알림 확인 도중 또 다른 실시간 알림 발생시 모달을 닫자마자 새로운 모달이 발생한다.',
    { timeout: 8000 },
    async () => {
      const { user } = setup();

      await screen.findByLabelText(/알림 박스/, {}, { timeout: 1100 });

      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
      });

      const button = screen.getByRole('button', {
        name: /경매 참여자 목록 보러가기/,
      });
      await user.click(button);

      const box = await screen.findByLabelText(
        /알림 박스/,
        {},
        { timeout: 1100 },
      );
      expect(box).toBeInTheDocument();
    },
  );
});

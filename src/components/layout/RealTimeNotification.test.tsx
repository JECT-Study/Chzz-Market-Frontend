import { act, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockedUseNavigate } from '@/setupTests';
import GlobalLayout from './GlobalLayout';

describe('Layout 알림 테스트', () => {
  // 테스트 시작 전에 EventSource 모킹
  beforeAll(() => {
    global.EventSource = vi.fn(() => ({
      addEventListener: vi.fn((event, callback) => {
        if (event === 'notification') {
          const messages = [
            {
              id: 1,
              title: '내 경매 알림',
              message:
                '[나이키] 신발 경매가 성공적으로 종료되었으며, 최종 구매자가 결정되었습니다.',
              buttonName: '경매 참여자 목록 보러가기',
            },
            {
              id: 2,
              title: '경매 취소 알림',
              message:
                '경매 취소 알림 해당 경매의 참여자가 없어 경매가 유찰되었습니다.',
              buttonName: '확인',
            },
            {
              id: 3,
              title: '내 경매 알림',
              message:
                '축하합니다! 경매에서 [나이키] 신발의 최종 구매자로 선정되었습니다.',
              buttonName: '구매 확정하러 가기',
            },
          ];

          messages.forEach((message, idx) => {
            setTimeout(() => {
              callback({ data: JSON.stringify(message) });
            }, [1000, 4000, 7000][idx]);
          });
        }
      }),
      close: vi.fn(),
    })) as unknown as typeof EventSource;
  });

  const setup = () => {
    const utils = render(<GlobalLayout />);
    const user = userEvent.setup();

    return {
      user,
      ...utils,
    };
  };

  test('로그인한 상태에서 실시간 알림이 도착하면 사용자 화면에 알림 팝업이 발생하고, 그 안에 제목, 메시지, 버튼이 존재한다.', async () => {
    render(<GlobalLayout />);

    const popup = await screen.findByLabelText(
      /알림 박스/,
      {},
      { timeout: 1100 },
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

  test('팝업이 발생하고 바깥 배경을 클릭하면 팝업이 사라진다.', async () => {
    const { user } = setup();

    const popup = await screen.findByLabelText(
      /알림 박스/,
      {},
      { timeout: 1100 },
    );

    const popupBackground = screen.getByLabelText('팝업 배경');
    await user.click(popupBackground);

    expect(popup).not.toBeInTheDocument();
  });

  describe('알림의 종류에 따라 알림 확인 여부를 달리한다.', () => {
    test(
      '확인 버튼인 알림인 경우 확인버튼을 클릭하면 팝업이 사라진다.',
      { timeout: 8000 },
      async () => {
        const { user } = setup();

        // 이전 팝업 삭제
        const popup = await screen.findByLabelText(
          /알림 박스/,
          {},
          { timeout: 1100 },
        );
        const popupBackground = screen.getByLabelText('팝업 배경');
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

    test('확인 버튼이 아닌 알림인 경우 버튼 클릭시 특정 작업이 수행된다.', async () => {
      const { user } = setup();

      await screen.findByLabelText(/알림 박스/, {}, { timeout: 1100 });

      const button = screen.getByRole('button', {
        name: /경매 참여자 목록 보러가기/,
      });
      await user.click(button);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/notification');
    });
  });

  test(
    '알림 확인 도중 또 다른 실시간 알림 발생시 팝업을 닫자마자 새로운 팝업이 발생한다.',
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

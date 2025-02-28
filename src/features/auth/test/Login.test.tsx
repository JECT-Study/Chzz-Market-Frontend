import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Login } from '@/pages/login/Login';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useRefreshTokenOnSuccess } from '../model/useRefreshTokenOnSuccess';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn()
}));

vi.mock('../model/useRefreshTokenOnSuccess', () => ({
  useRefreshTokenOnSuccess: vi.fn()
}));

describe('로그인 페이지 테스트', () => {
  const setup = (isLoggedIn = false) => {
    const user = userEvent.setup();

    vi.mocked(useAuth).mockReturnValue({
      handleKakaoLogin: vi.fn().mockImplementation(() => {
        vi.mocked(useRefreshTokenOnSuccess).mockReturnValueOnce({
          isSuccess: true
        });
      }),
      handleNaverLogin: vi.fn().mockImplementation(() => {
        vi.mocked(useRefreshTokenOnSuccess).mockReturnValueOnce({
          isSuccess: true
        });
      }),
      handleLogout: vi.fn()
    });

    vi.mocked(useRefreshTokenOnSuccess).mockReturnValue({
      isSuccess: isLoggedIn // 초기 로그인 상태 설정
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );

    return { user, mockedUseNavigate };
  };

  test('로그인 페이지 렌더링 확인', () => {
    setup();

    expect(screen.getByText('치즈 마켓')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /카카오 로그인/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /네이버 로그인/ })
    ).toBeInTheDocument();
  });

  test('로그인 후 메인 페이지로 리다이렉션', () => {
    setup(true);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  test('카카오 로그인 버튼 클릭 시 handleKakaoLogin 호출', async () => {
    const { user } = setup();
    const kakaoButton = screen.getByRole('button', { name: /카카오 로그인/ });
    await user.click(kakaoButton);

    expect(useAuth().handleKakaoLogin).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  test('네이버 로그인 버튼 클릭 시 handleNaverLogin 호출', async () => {
    const { user } = setup();
    const naverButton = screen.getByRole('button', { name: /네이버 로그인/ });
    await user.click(naverButton);

    expect(useAuth().handleNaverLogin).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  test('isSuccess가 true일 때 홈 페이지로 이동', () => {
    vi.mocked(useRefreshTokenOnSuccess).mockReturnValueOnce({
      isSuccess: true
    });

    setup();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });
});

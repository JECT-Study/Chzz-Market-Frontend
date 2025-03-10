import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Login } from '@/pages/login/Login';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { useAuth } from '../hooks/useAuth';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn()
}));

describe('로그인 페이지 테스트', () => {
  const setup = () => {
    const user = userEvent.setup();

    vi.mocked(useAuth).mockReturnValue({
      handleKakaoLogin: vi.fn(),
      handleNaverLogin: vi.fn(),
      handleLogout: vi.fn()
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
    expect(screen.getByLabelText('logo')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /카카오 로그인/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /네이버 로그인/ })
    ).toBeInTheDocument();
  });

  test('카카오 로그인 버튼 클릭 시 handleKakaoLogin 호출', async () => {
    const { user } = setup();
    const kakaoButton = screen.getByRole('button', { name: /카카오 로그인/ });
    await user.click(kakaoButton);

    expect(useAuth().handleKakaoLogin).toHaveBeenCalled();
  });

  test('네이버 로그인 버튼 클릭 시 handleNaverLogin 호출', async () => {
    const { user } = setup();
    const naverButton = screen.getByRole('button', { name: /네이버 로그인/ });
    await user.click(naverButton);

    expect(useAuth().handleNaverLogin).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MyPage from '@/pages/MyPage';

describe('Mypage', () => {
  it.skip('렌더 테스트 마이페이지', () => {
    render(
      <BrowserRouter>
        <MyPage />
      </BrowserRouter>,
    );

    // Header
    expect(screen.getByText('마이페이지')).toBeInTheDocument();

    // Main
    expect(screen.getByText('모든 참여 내역')).toBeInTheDocument();
    expect(screen.getByText('내가 등록한 경매')).toBeInTheDocument();
    expect(screen.getByText('설정')).toBeInTheDocument();
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });
});

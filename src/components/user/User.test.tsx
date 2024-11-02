import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { User } from '@/pages/user';
import { BrowserRouter } from 'react-router-dom';

describe('USER', () => {
  it.skip('렌더 테스트 마이페이지', () => {
    render(
      <BrowserRouter>
        <User />
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

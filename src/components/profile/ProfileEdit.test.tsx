import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProfileEdit from '@/pages/ProfileEdit';

describe('ProfileEdit', () => {
  it('프로필 수정 페이지 input test', () => {
    render(
      <BrowserRouter>
        <ProfileEdit />
      </BrowserRouter>,
    );

    expect(screen.getByText('닉네임')).toBeInTheDocument();
    expect(screen.getByText('자기소개')).toBeInTheDocument();
    expect(screen.getByText('지역')).toBeInTheDocument();
    expect(screen.getByText('링크')).toBeInTheDocument();
  });
});

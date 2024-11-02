import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserProfileEdit } from '@/pages/user';
import { BrowserRouter } from 'react-router-dom';

describe.skip('ProfileEdit', () => {
  it('프로필 수정 페이지 input test', () => {
    render(
      <BrowserRouter>
        <UserProfileEdit />
      </BrowserRouter>,
    );

    expect(screen.getByText('닉네임')).toBeInTheDocument();
    expect(screen.getByText('자기소개')).toBeInTheDocument();
    expect(screen.getByText('지역')).toBeInTheDocument();
    expect(screen.getByText('링크')).toBeInTheDocument();
  });
});

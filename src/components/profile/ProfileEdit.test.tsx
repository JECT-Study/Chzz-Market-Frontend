import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import ProfileEdit from '@/pages/ProfileEdit';

describe.skip('ProfileEdit', () => {
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

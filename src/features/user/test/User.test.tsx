import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockedUseNavigate } from "@/shared/test/setupTests";
import { UserProfile } from "@/features/user/ui";

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('유저 페이지 테스트', () => {
  const setup = (props = {}) => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <UserProfile {...props} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    return { user };
  };
  
  test('로딩될 때 스피너 테스트', () => {
    setup({ isLoading: true });
    expect(screen.getByRole('status')).toBeInTheDocument();
  })

  test("수정 버튼 클릭 시 edit 페이지로 이동", async () => {
    const { user } = setup({
      nickname: "테스트 사용자",
      bio: "테스트 소개",
      profileImageUrl: "/test.jpg",
    });

    const editButton = screen.getByRole("button", { name: "수정" });
    await user.click(editButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith("profile/edit", {
      state: {
        userNickname: "테스트 사용자",
        userBio: "테스트 소개",
        userProfileImageUrl: "/test.jpg",
      },
    });
  });
});
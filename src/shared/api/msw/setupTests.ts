import '@testing-library/jest-dom';

import { beforeAll, vi } from 'vitest';

/**
 * vi.fn()은 모의 함수나 스파이 함수(함수 호출을 기록하고 추적할 수 있는 함수)를 생성할 수 있다.
 * 이 모의 함수는 나중에 호출된 횟수, 호출 시 전달된 인수 등을 추적할 수 있다.
 * vi.mock을 사용하여 react-router-dom 모듈을 모킹하고, 특정 기능(useNavigate)을 사용자 정의된 모의 함수로 대체
 * 모듈 모킹은 테스트 환경에서 해당 모듈의 실제 구현을 대체하여 테스트 목적에 맞게 수정된 버전을 사용하게 한다.
 * 이 모킹 코드는 테스트 중에 react-router-dom의 useNavigate 훅을 사용하는 컴포넌트를 렌더링할 때 실제 네비게이션 동작을 발생시키지 않고 mockedUseNavigate 라는 모의함수가 호출되도록 한다.
 */

export const mockedUseNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  // importActual은 실제 모듈의 원래 구현을 가져오는 기능을 한다.
  // 일부 기능은 실제 동작을 그대로 유지하면서 useNavigate만 모킹하려는 경우에 유용하다.
  const mod =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...mod,
    // useNavigate 훅이 호출될 때마다 mockedUseNavigate 라는 모의 함수가 호출된다.
    useNavigate: () => mockedUseNavigate
  };
});

// matchMedia 모킹을 위한 변수
let matchingMediaQueries: string[] = [];

export function setMatchingMediaQuery(queries: string | string[]): void {
  matchingMediaQueries = Array.isArray(queries) ? queries : [queries];
}

export function resetMatchingMediaQuery(): void {
  matchingMediaQueries = [];
}

export const mockWindowProperties = () => {
  const mockWindowProperty = (property: string, implementation: any) => {
    Object.defineProperty(window, property, {
      writable: true,
      value: vi.fn().mockImplementation(implementation)
    });
  };

  // ResizeObserver 모킹
  mockWindowProperty('ResizeObserver', () => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));

  // matchMedia 모킹
  mockWindowProperty('matchMedia', (query: string) => ({
    matches: matchingMediaQueries.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }));

  // IntersectionObserver 모킹
  mockWindowProperty('IntersectionObserver', () => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));

  // jsdom이 지원하지 않는 Element.prototype 메서드 모킹
  Object.defineProperty(Element.prototype, 'hasPointerCapture', {
    writable: true,
    value: vi.fn(() => false)
  });

  Object.defineProperty(Element.prototype, 'setPointerCapture', {
    writable: true,
    value: vi.fn()
  });

  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    writable: true,
    value: vi.fn()
  });

  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: vi.fn(() => 'mocked-url')
  });
};

// Apply the mocks before all tests
beforeAll(() => {
  mockWindowProperties();
});

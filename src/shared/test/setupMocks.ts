export async function setupMocks(): Promise<void> {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  if (import.meta.env.VITE_USE_MOCK !== 'true') return;

  const { worker } = await import('../test/browser');
  await worker.start({
    onUnhandledRequest: (req) => {
      const url = new URL(req.url);
      if (url.pathname.endsWith('.svg')) {
        return; // .svg 파일 요청을 무시
      }
    },
  });
}

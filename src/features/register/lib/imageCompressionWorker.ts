/// <reference lib="webworker" />

import { toast } from 'sonner';

interface WorkerMessage {
  fileData: ArrayBuffer;
  fileName: string;
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { fileData, fileName } = e.data;

  try {
    const blob = new Blob([fileData]);
    const imageBitmap = await createImageBitmap(blob);

    const maxWidth = imageBitmap.width > 750 ? 750 : imageBitmap.width;
    const scale = maxWidth / imageBitmap.width;
    const targetWidth = maxWidth;
    const targetHeight = imageBitmap.height * scale;

    const offscreen = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = offscreen.getContext('2d');

    if (!ctx) {
      toast.error('이미지 업로드에 실패했습니다.');
      return;
    }

    ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

    // quality 설정
    const quality = 0.9;
    const webpBlob = await offscreen.convertToBlob({
      type: 'image/webp',
      quality,
    });

    // 변환된 Blob을 메인 스레드로 전송
    // (메인 스레드에서 File로 감싸 최종 반환)
    const arrayBuffer = await webpBlob.arrayBuffer();
    self.postMessage({ arrayBuffer, fileName }, [arrayBuffer]);
  } catch (error) {
    // 에러 발생 시 메인 스레드에 알림
    self.postMessage({ error: (error as Error).message });
  }
};

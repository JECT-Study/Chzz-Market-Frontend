import { toast } from 'sonner';

export const compressAndConvertToWebP = async (file: File): Promise<File> => {
  try {
    const fileArrayBuffer = await file.arrayBuffer();

    const worker = new Worker(
      new URL('../lib/imageCompressionWorker.ts', import.meta.url),
      { type: 'module' }
    );

    return new Promise<File>((resolve, reject) => {
      worker.onmessage = (e: MessageEvent) => {
        const { arrayBuffer, fileName } = e.data;

        const blob = new Blob([arrayBuffer], { type: 'image/webp' });
        const webpFile = new File([blob], fileName, { type: 'image/webp' });
        resolve(webpFile);
        worker.terminate();
      };

      worker.onerror = (err) => {
        toast.error('이미지 압축 worker error!');
        reject(err);
        worker.terminate();
      };

      worker.postMessage({ fileData: fileArrayBuffer, fileName: file.name }, [
        fileArrayBuffer
      ]);
    });
  } catch {
    toast.error('이미지를 읽지 못했습니다.');
    throw new Error('이미지를 읽지 못했습니다.');
  }
};

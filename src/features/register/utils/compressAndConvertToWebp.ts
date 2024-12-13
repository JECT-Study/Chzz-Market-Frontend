import { toast } from 'sonner';

export const compressAndConvertToWebP = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') {
        toast.error('잘못된 이미지입니다.');
        return;
      }

      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 750px 이하면 유지, 초과면 750px로 변경
        const maxWidth = img.width > 750 ? 750 : img.width; // 최대 너비 설정
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const quality = 0.9;

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(toast.error('이미지를 압축하지 못했습니다.'));
                return;
              }

              const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                type: 'image/webp',
                lastModified: Date.now(),
              });
              resolve(webpFile);
            },
            'image/webp',
            quality
          );
        } else {
          reject(toast.error('Canvas를 생성하지 못했습니다.'));
        }
      };

      img.onerror = () => reject(toast.error('이미지를 로딩하지 못했습니다.'));
    };

    reader.onerror = () => reject(toast.error('이미지를 읽지 못했습니다.'));
  });
};

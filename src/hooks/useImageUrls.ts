import { useMemo } from 'react';

interface ImageObject {
  imageId?: number;
  imageUrl: string;
}

type ImageData = string[] | ImageObject[];

interface NormalizedImage {
  key: number | string;
  imageUrl: string;
}

const useImageUrls = (images: ImageData): NormalizedImage[] => {
  return useMemo(() => {
    if (images.length === 0) return [];

    if (typeof images[0] === 'string') {
      // 이미지가 ID의 배열인 경우 (auctionDetails)
      return (images as string[]).map((id, idx) => ({
        key: idx + 1,
        imageUrl: id,
      }));
    }
    // 이미지가 Object인 경우 (PreAuctionDetails)
    return (images as ImageObject[]).map((image, idx) => ({
      key: image.imageId || idx + 1,
      imageUrl: image.imageUrl,
    }));
  }, [images]);
};

export default useImageUrls;

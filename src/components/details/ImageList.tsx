import useImageUrls from '@/hooks/useImageUrls';
import CustomCarousel from '../common/CustomCarousel';
import { CarouselItem } from '../ui/carousel';
import ImageItem from './ImageItem';

interface ImageListProps {
  images: string[] | { imageId?: number; imageUrl: string }[];
  productName: string;
  productId: number;
}

const ImageList = ({ images, productName, productId }: ImageListProps) => {
  const imageUrls = useImageUrls(images);
  const { length } = imageUrls;

  return (
    <CustomCarousel length={length}>
      {imageUrls.map((img) => (
        <CarouselItem key={`productId${productId}_${img.key}`}>
          <ImageItem url={img.imageUrl} productName={productName} />
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
};

export default ImageList;

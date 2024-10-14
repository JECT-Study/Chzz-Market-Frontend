import { CarouselItem } from '../ui/carousel';
interface ImageItemProps {
  url: string;
  productName: string;
}

const ImageItem = ({ url, productName }: ImageItemProps) => {
  return (
    <CarouselItem className='w-full mb-2'>
      <img src={url} alt={productName} className='object-cover w-full h-auto' />
    </CarouselItem>
  );
};
export default ImageItem;

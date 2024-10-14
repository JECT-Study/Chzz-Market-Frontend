import { ReactNode } from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '../ui/carousel';

const CustomCarousel = ({ contentStyle, length, children }: { contentStyle?: string; length: number; children: ReactNode }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
        watchDrag: false,
        loop: true,
      }}
      className='w-full overflow-scroll'
    >
      <CarouselContent className={`flex items-center h-full ${contentStyle}`}>{children}</CarouselContent>
      {length > 1 && (
        <>
          <CarouselPrevious type='button' className='ml-14' />
          <CarouselNext type='button' className='mr-14' />
        </>
      )}
    </Carousel>
  );
};

export default CustomCarousel;

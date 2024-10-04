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
          <CarouselPrevious className='z-50 ml-14' />
          <CarouselNext className='z-50 mr-14' />
        </>
      )}
    </Carousel>
  );
};

export default CustomCarousel;

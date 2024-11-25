import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './carousel';

import { ReactNode } from 'react';

interface CustomCarouselProps { contentStyle?: string; length?: number; children: ReactNode; loop?: boolean }

export const CustomCarousel = ({ contentStyle, length = 0, children, loop = false }: CustomCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
        watchDrag: false,
        loop
      }}
      className='flex-1 w-full overflow-hidden'
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
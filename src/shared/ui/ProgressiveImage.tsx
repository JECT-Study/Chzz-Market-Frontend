import { ImgHTMLAttributes, useEffect, useState } from 'react';

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  lowResSrc: string;
  highResSrc: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  priority?: 'high' | 'low';
}

export const ProgressiveImage = ({ lowResSrc, highResSrc, alt, priority, loading, ...props }: ProgressiveImageProps) => {
  const [highResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc;
    img.onload = () => {
      setHighResLoaded(true);
    };

  }, [highResSrc]);

  return (
    <div className='relative h-full overflow-hidden'>
      <img
        src={lowResSrc}
        style={{
          opacity: highResLoaded ? 0 : 1,
          transition: 'opacity 0.7s ease-out',
          display: 'block'
        }}
        loading={loading}
        fetchPriority={priority}
        {...props}
      />
      <img
        src={highResSrc}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: highResLoaded ? 1 : 0,
          transition: 'opacity 0.7s ease-out'
        }}
        loading={loading}
        fetchPriority={priority}
        {...props}
      />
    </div>

  );
};
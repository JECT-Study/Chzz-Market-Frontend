import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  lowResSrc: string;
  highResSrc: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  priority?: 'high' | 'low';
}

export const ProgressiveImage = ({
  lowResSrc,
  highResSrc,
  alt,
  priority,
  loading,
  ...props
}: ProgressiveImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(lowResSrc);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.1) {
            const img = new Image();
            img.src = highResSrc;
            img.onload = () => {
              setCurrentSrc(highResSrc);
              setIsHighResLoaded(true);
            };
            observerInstance.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '200px' // 약간의 여유 영역을 줘서 더 빨리 로드 시작
      }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      observer.disconnect();
    }
  }, [highResSrc, priority]);


  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      loading={loading}
      style={{
        transition: 'filter 0.5s ease-out',
        filter: !isHighResLoaded ? 'blur(5px)' : 'none'
      }}
      {...{ fetchpriority: priority }}
      {...props}
    />
  );
};

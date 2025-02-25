import { ImgHTMLAttributes, useEffect, useState } from 'react';

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
  // 현재 표시 중인 src
  const [currentSrc, setCurrentSrc] = useState(lowResSrc);
  // 고해상도 이미지 로드 여부
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc;
    img.onload = () => {
      setCurrentSrc(highResSrc);
      setIsHighResLoaded(true);
    };
  }, [highResSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      style={{
        transition: 'filter 0.5s ease-out',
        filter: isHighResLoaded ? 'none' : 'blur(5px)',
      }}
      loading={loading}
      {...{ fetchpriority: priority }}
      {...props}
    />
  );
};

import { useEffect, useRef, useState } from 'react';

export const useScrollDetection = (position: number) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    const handleScroll = () => {
      if (element && element.scrollTop > position) setIsScrolled(true);
      else setIsScrolled(false);
    };

    if (element) element.addEventListener('scroll', handleScroll);

    return () => {
      if (element) element.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  return { isScrolled, elementRef };
};

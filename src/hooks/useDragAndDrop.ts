import { DragEvent, useState } from 'react';

export const useDragAndDrop = (
  state: string[],
  setState: (images: string[]) => void,
) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const newImages = [...state];
      [newImages[index], newImages[draggedIndex]] = [
        newImages[draggedIndex],
        newImages[index],
      ];
      setState(newImages);
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  return {
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    hoveredIndex,
  };
};

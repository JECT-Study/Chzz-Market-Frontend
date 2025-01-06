import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

export const useDragAndDrop = (state: string[], setState: (state: string[]) => void) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // 센서 정의, PointerSensor는 마우스, 터치, 펜 이벤트를 모두 커버
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = state.indexOf(active.id as string);
      const newIndex = state.indexOf(over.id as string);
      const newImages = arrayMove(state, oldIndex, newIndex);
      setState(newImages);
    }

    setActiveId(null);
  };
  return {
    activeId,
    sensors,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
  };
};

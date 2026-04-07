import {useSortable} from '@dnd-kit/sortable';
import { DragIndicatorOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { ReactNode } from 'react';

type SortableItemProps = {
    id: string,
    children: ReactNode
};

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform: transformObject,
    transition,
    isDragging,
    setActivatorNodeRef
  } = useSortable({ id });
  
  const transformStyle = transformObject
  ? { transform: `translate(${transformObject.x}px, ${transformObject.y}px)` }
  : {};

  return (
    <Box 
        sx={{
            position: 'relative',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            transition,
            ...transformStyle,
            zIndex: isDragging ? 10 : 1,
        }} 
        ref={setNodeRef}
        
    >
        <Box
            sx={{ 
                color: 'text.secondary',
                cursor: isDragging ? "grabbing" : "grab",
            }} 
            ref={setActivatorNodeRef}
            {...attributes} 
            {...listeners}
            tabIndex={0}
            data-testid="sortable-item-drag-handle"
        >
            <DragIndicatorOutlined />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            {children}
        </Box>
    </Box>
  );
}
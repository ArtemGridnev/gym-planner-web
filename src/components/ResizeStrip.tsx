import { Box } from "@mui/material";

type ResizeStripProps = {
    orintation?: 'vertical' | 'horizontal';
    onMouseDown: () => void;
    isResizing: boolean;
};

export default function ResizeStrip({ onMouseDown, isResizing, orintation = 'vertical' }: ResizeStripProps) {
    return (
        <Box
            sx={{
                width: orintation === 'horizontal' ? '100%' : 4,
                height: orintation === 'vertical' ? '100%' : 4,
                cursor: "col-resize",
                zIndex: 1,
                userSelect: "none",
                bgcolor: isResizing ? 'action.hover' : 'inherit',
                '&:hover': { bgcolor: 'action.hover' },
                borderRadius: 1,
            }}
            onMouseDown={onMouseDown}
        />
    )
}
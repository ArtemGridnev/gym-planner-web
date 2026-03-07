import { useState, useCallback, useEffect, useRef } from "react";

export default function useResizeHandleState(
    minWidth: number,
    maxWidth: number,
    defaultWidth: number = minWidth
) {
    const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
    const [isResizing, setIsResizing] = useState(false);
    const savedWidthRef = useRef<number>(defaultWidth);

    const handleMouseDown = useCallback(() => {
        savedWidthRef.current = sidebarWidth;
        setIsResizing(true);
        document.body.style.cursor = "col-resize";
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing) return;
        const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX));
        setSidebarWidth(newWidth);
    }, [isResizing, minWidth, maxWidth]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.body.style.cursor = "";
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "";
        };
    }, [handleMouseMove, handleMouseUp]);

    return {
        sidebarWidth,
        isResizing,
        handleMouseDown
    };
}

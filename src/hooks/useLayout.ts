import { useCallback, useMemo, useState } from "react";

export default function useLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const openSidebar = useCallback(() => {
        setIsSidebarOpen(true);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    const toggleMobileSidebar = useCallback(() => {
        setIsSidebarMobileOpen(prev => !prev);
    }, []);

    const openMobileSidebar = useCallback(() => {
        setIsSidebarMobileOpen(true);
    }, []);

    const closeMobileSidebar = useCallback(() => {
        setIsSidebarMobileOpen(false);
    }, []);

    return useMemo(() => ({
        isSidebarOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
        isSidebarMobileOpen,
        toggleMobileSidebar,
        openMobileSidebar,
        closeMobileSidebar
    }), [isSidebarOpen, toggleSidebar, openSidebar, closeSidebar, isSidebarMobileOpen, toggleMobileSidebar, openMobileSidebar, closeMobileSidebar]);
}
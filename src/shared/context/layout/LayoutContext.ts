import { createContext } from "react";

export type LayoutContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isSidebarMobileOpen: boolean;
  toggleMobileSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
};

export const LayoutContext = createContext<LayoutContextType | null>(null);
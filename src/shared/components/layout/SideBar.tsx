import { Box, Drawer, useMediaQuery, type BoxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResizeHandleState from "../../hooks/useResizeHandleState";
import ResizeStrip from "../ResizeStrip";
import { useLayoutContext } from "../../context/layout/useLayoutContext";

type SideBarProps = Omit<BoxProps, 'width'> & {
    defaultWidth: number;
    min: number;
    max: number;
};

export default function SideBar({ children, sx, defaultWidth, min, max, ...props }: SideBarProps) {
    const { 
        isSidebarOpen,
        isSidebarMobileOpen,
        toggleMobileSidebar
    } = useLayoutContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const {
        sidebarWidth,
        isResizing,
        handleMouseDown
    } = useResizeHandleState(min, max, defaultWidth);

    return (
        <>
            <Box
                component="nav"
                sx={{
                    position: 'relative',
                    flexShrink: 0,
                    overflow: 'hidden',
                    width: isMobile ? 'auto' : isSidebarOpen ? sidebarWidth : 72, 
                    ...sx
                }}
                aria-label="dashboard sidebar"
                {...props}
            >
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? isSidebarMobileOpen : true}
                    onClose={toggleMobileSidebar}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            position: {
                                xs: 'fixed',
                                md: 'absolute',
                            },
                            width: isSidebarOpen ? sidebarWidth : 72,
                            border: 'unset',
                            p: 'unset',
                            px: 1,
                            bgcolor: {
                                xs: 'background.paper',
                                md: 'unset',
                            },
                        }
                    }}
                >
                    {children}
                </Drawer>
            </Box>
            {isSidebarOpen && !isMobile && <ResizeStrip isResizing={isResizing} onMouseDown={handleMouseDown} />}
        </>
    );
}
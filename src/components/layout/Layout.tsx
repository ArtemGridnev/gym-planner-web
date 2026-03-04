import React from "react";
import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import type { SidebarNavItemProps } from "../nav/SidebarNavItem";
import SideBar from "./SideBar";
import SidebarNav from "../nav/SidebarNav";
import LoadingBar from "./LoadingBar";
import useLayout from "../../hooks/useLayout";
import { LayoutContext } from "../../context/layout/LayoutContext";
import BottomNavigation from "./bottomNavigation/BottomNavigation";
import type { BottomNavigationItemProps } from "./bottomNavigation/BottomNavigation";

export type LayoutProps = {
    children: React.ReactNode;
    sideBarNavItems: SidebarNavItemProps[];
    bottomNavigationItems: BottomNavigationItemProps[];
}

export default function Layout({ children, sideBarNavItems, bottomNavigationItems }: LayoutProps) {
    const layout = useLayout();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (    
        <LayoutContext value={layout}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100vh', 
                    background: "#f9fafd" 
                }}
            >
                <LoadingBar />
                <Header />
                <Box sx={{ display: 'flex', height: '100%', overflow: 'auto' }}>
                    {!isMobile && (
                        <SideBar defaultWidth={250} min={250} max={400}>
                            <SidebarNav items={sideBarNavItems}></SidebarNav>
                        </SideBar>
                    )}
                    <Box sx={{ 
                        height: '100%',
                        paddingInlineEnd: { md: 2, xs: 0 },
                        paddingBottom: { md: 2, xs: 0 },
                        flexGrow: 1,
                        overflow: 'hidden'
                    }}>
                        {children}
                    </Box>
                </Box>
                {isMobile && (
                    <Paper elevation={3}>
                        <BottomNavigation items={bottomNavigationItems} />
                    </Paper>
                )}
            </Box>
        </LayoutContext>
    );
}
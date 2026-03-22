import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useState, type ElementType } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutContext } from "../../context/layout/useLayoutContext";

export type SidebarNavItemProps = {
    path?: string;
    text: string;
    icon: ElementType;
    children?: SidebarNavItemProps[];
    testid?: string;
};

export default function SidebarNavItem({ path, text, icon: Icon, children, testid }: SidebarNavItemProps) {
    const { isSidebarOpen, openSidebar, closeMobileSidebar } = useLayoutContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const isShowingCompact = !isSidebarOpen && !isMobile;

    const isActive = path && path === location.pathname;

    const handleClick = () => {
        if (path) {
            navigate(path);
            if (isMobile) closeMobileSidebar();
        }
        if (children) setOpen(!open);
        if (children && !isSidebarOpen) openSidebar();
    };

    return (
        <>
            <ListItem 
                key={text} 
                disablePadding
                data-testid={testid}
            >
                <ListItemButton 
                    onClick={() => handleClick()} 
                    sx={{
                        borderRadius: 2,
                        bgcolor: isActive ? 'action.selected' : 'inherit',
                    }}
                >
                    <ListItemIcon 
                        sx={{
                            minWidth: 48,
                            my: 0.5
                        }}
                    >
                        <Icon />
                    </ListItemIcon>
                    {!isShowingCompact && <ListItemText primary={text} />}
                    {children && !isShowingCompact && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>
            {children && !isShowingCompact  && (
                <Collapse in={open} sx={{ paddingInlineStart: 2.5 }}>
                    {children.map((child, index) => (
                        <SidebarNavItem {...child} key={index}></SidebarNavItem>
                    ))}
                </Collapse>
            )}
        </>
    );
}
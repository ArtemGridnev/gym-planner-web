import { useState } from "react";
import { Box, type BoxProps } from "@mui/material";
import Menu from "./menu/Menu";
import type { MenuItemProps } from "./menu/MenuItem";

type IconButtonMenuProps = Omit<BoxProps, 'onClick' | 'component'> & {
    items: MenuItemProps[];
};

export default function ButtonMenu({ items, children, sx, ...props }: IconButtonMenuProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const onItemClick = () => {
        closeMenu();
    }

    return (
        <>
            <Box 
                role="button"
                tabIndex={0}
                onClick={(e) => toggleMenu(e)} 
                sx={{ 
                    cursor: 'pointer',
                    textAlign: 'start',
                    ...sx
                }}
                {...props}
            >
                {children}
            </Box>
            <Menu anchorEl={anchorEl} items={items} open={open} onItemClick={onItemClick} onClose={closeMenu}></Menu>
        </>
    );
}
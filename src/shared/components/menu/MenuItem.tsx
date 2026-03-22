import { MenuItem as MenuItemMui } from "@mui/material";
import type { ElementType } from "react";

export type MenuItemProps = {
    icon?: ElementType;
    text: string;
    onClick: () => void;
    testid?: string;
};

export default function MenuItem({ icon: Icon, text, onClick, testid }: MenuItemProps) {
    return (
        <MenuItemMui sx={{ gap: 1 }} onClick={() => onClick()} data-testid={testid}>
            {Icon && <Icon sx={{ color: 'text.secondary' }} />}
            {text}
        </MenuItemMui>
    );
}
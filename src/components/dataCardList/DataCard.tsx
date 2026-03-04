import { Box, IconButton, Typography } from "@mui/material";
import type { ElementType } from "react";
import type { MenuItemProps } from "../menu/MenuItem";
import ButtonMenu from "../ButtonMenu";
import { MoreVertOutlined } from "@mui/icons-material";
import DataCardBase from "./DataCardBase";

export type DataCardProps = {
    icon?: ElementType;
    title: string;
    children?: React.ReactNode;
    menuItems?: MenuItemProps[];
    onClick?: () => void;
};

export default function DataCard({ icon: Icon, title, children, menuItems, onClick }: DataCardProps) {
    return (
        <DataCardBase 
            sx={{
                ...(onClick && { cursor: 'pointer' })
            }}
            {...(onClick && { onClick })}
        >
            {Icon && (
                <Icon 
                    sx={{ 
                        width: 24,
                        height: 24,
                        color: 'text.secondary',
                    }}
                 />
            )}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>{title}</Typography>
                {children}
            </Box>
            {menuItems && (
                <Box onClick={(e) => e.stopPropagation()}>
                    <ButtonMenu items={menuItems}>
                        <IconButton aria-label={`Actions for ${title}`}>
                            <MoreVertOutlined />
                        </IconButton>
                    </ButtonMenu>
                </Box>
            )}
        </DataCardBase>
    );
}
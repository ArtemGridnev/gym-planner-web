import { Box, IconButton, Typography, type BoxProps } from "@mui/material";
import type { ElementType } from "react";
import type { MenuItemProps } from "../menu/MenuItem";
import ButtonMenu from "../ButtonMenu";
import { MoreVertOutlined } from "@mui/icons-material";
import DataCardBase from "./DataCardBase";

export type DataCardProps = Omit<BoxProps, 'onClick'> & {
    icon?: ElementType;
    title: string;
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
                <Typography variant="body1" sx={{ marginBottom: 1 }} data-testid="data-card-title">{title}</Typography>
                {children}
            </Box>
            {menuItems && (
                <Box onClick={(e) => e.stopPropagation()}>
                    <ButtonMenu items={menuItems} data-testid="data-card-actions-button">
                        <IconButton aria-label={`Actions for ${title}`}>
                            <MoreVertOutlined />
                        </IconButton>
                    </ButtonMenu>
                </Box>
            )}
        </DataCardBase>
    );
}
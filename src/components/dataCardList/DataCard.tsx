import { Box, IconButton, Typography } from "@mui/material";
import type { ElementType } from "react";
import type { MenuItemProps } from "../menu/MenuItem";
import ButtonMenu from "../ButtonMenu";
import { MoreVertOutlined } from "@mui/icons-material";

export type DataCardProps = {
    icon?: ElementType;
    title: string;
    children?: React.ReactNode;
    menuItems?: MenuItemProps[];
    onClick?: () => void;
};

export default function DataCard({ icon: Icon, title, children, menuItems, onClick }: DataCardProps) {
    return (
        <Box 
            sx={{
                display: 'flex',
                background: 'white',
                gap: '0.75rem',
                padding: '0.75rem',
                alignItems: 'flex-start',
                borderColor: 'divider',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: (theme) => theme.shape.borderRadius,
                ...(onClick && { cursor: 'pointer' })
            }}
            {...(onClick && { onClick: () => onClick() })}
        >
            {Icon && (
                <Icon 
                    sx={{ 
                        width: '1.5rem',
                        height: '1.5rem',
                        color: 'text.secondary',
                    }}
                 />
            )}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>{title}</Typography>
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
        </Box>
    );
}
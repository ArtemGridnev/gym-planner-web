import { Box, Chip, IconButton, Typography, type BoxProps } from "@mui/material";
import type { ElementType } from "react";
import type { MenuItemProps } from "../menu/MenuItem";
import ButtonMenu from "../ButtonMenu";
import { MoreVertOutlined } from "@mui/icons-material";
import DataCardBase from "./DataCardBase";

export type DataCardProps = Omit<BoxProps, 'onClick'> & {
    icon?: ElementType;
    title: string;
    chip?: string | string[];
    menuItems?: MenuItemProps[];
    testid?: string;
    onClick?: () => void;
};

export default function DataCard({ icon: Icon, title, chip, children, menuItems, testid, onClick }: DataCardProps) {
    const chips = chip ? (Array.isArray(chip) ? chip : [chip]) : [];

    return (
        <DataCardBase
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onClick={onClick}
            onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
            sx={{
                cursor: onClick ? 'pointer' : undefined,
                outline: 'none',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                ...(onClick && {
                    '&:hover, &:focus-visible': {
                        boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
                        borderColor: 'grey.300',
                    },
                }),
            }}
            data-testid={testid ?? "data-card"}
        >
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ width: '3px', bgcolor: 'primary.main', flexShrink: 0 }} />
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.75,
                    p: '13px 13px 13px 16px',
                    minWidth: 0,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                            {Icon && (
                                <Icon sx={{ width: 18, height: 18, color: 'text.secondary', flexShrink: 0 }} />
                            )}
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                noWrap
                                sx={{ lineHeight: 1.3, flex: '0 1 auto', minWidth: 0 }}
                                data-testid="data-card-title"
                            >
                                {title}
                            </Typography>
                            {chips.map((label) => (
                                <Chip
                                    key={label}
                                    label={label}
                                    size="small"
                                    sx={{ flexShrink: 0 }}
                                />
                            ))}
                        </Box>
                        {menuItems && (
                            <Box onClick={(e) => e.stopPropagation()} sx={{ flexShrink: 0 }}>
                                <ButtonMenu items={menuItems} data-testid="data-card-actions-button">
                                    <IconButton size="small" aria-label={`Actions for ${title}`}>
                                        <MoreVertOutlined fontSize="small" />
                                    </IconButton>
                                </ButtonMenu>
                            </Box>
                        )}
                    </Box>
                    {children}
                </Box>
            </Box>
        </DataCardBase>
    );
}

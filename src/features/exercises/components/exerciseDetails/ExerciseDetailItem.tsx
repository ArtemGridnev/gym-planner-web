import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ElementType } from "react";

export const TILE_MIN_HEIGHT = 76;
const ICON_BOX = 20;
const MISSING_VALUE = "—";

export type ExerciseDetailItemProps = {
    label: string;
    value: number | string | null | undefined;
    suffix?: string;
    icon: ElementType;
};

function isMissing(value: number | string | null | undefined): boolean {
    return value == null || (typeof value === "string" && value.trim() === "");
}

function formatDetailValue(value: number | string | null | undefined, suffix?: string): string {
    if (isMissing(value)) return MISSING_VALUE;
    const base = typeof value === "number" ? value.toLocaleString() : String(value);
    return suffix ? `${base} ${suffix}` : base;
}

function DetailIcon({ icon: Icon }: { icon: ElementType }) {
    return (
        <Box
            sx={{
                width: ICON_BOX,
                height: ICON_BOX,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Icon sx={{ fontSize: 18, display: "block" }} />
        </Box>
    );
}

export default function ExerciseDetailItem({ icon, label, value, suffix }: ExerciseDetailItemProps) {
    const hasValue = !isMissing(value);

    return (
        <Box
            sx={{
                p: 1.5,
                borderRadius: 2,
                minHeight: TILE_MIN_HEIGHT,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 0.75,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
            }}
        >
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: "text.secondary" }}>
                <DetailIcon icon={icon} />
                <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {label}
                </Typography>
            </Stack>
            <Typography
                variant="h6"
                sx={{ fontWeight: 600, lineHeight: 1.2, color: hasValue ? "text.primary" : "text.disabled" }}
            >
                {formatDetailValue(value, suffix)}
            </Typography>
        </Box>
    );
}

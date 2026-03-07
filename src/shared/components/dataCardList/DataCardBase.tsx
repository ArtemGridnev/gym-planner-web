import { Box, type BoxProps } from "@mui/material";

export default function DataCardBase({
  children,
  sx,
  ...rest
}: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#f0f4f9",
        gap: 2,
        padding: 2,
        alignItems: "flex-start",
        borderRadius: 2,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

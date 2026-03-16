import { Box, type BoxProps } from "@mui/material";

type ContentCardProps = BoxProps;

export default function ContentCard({ sx, ...props }: ContentCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "white",
        borderRadius: 3,
        flexDirection: "column",
        ...sx
      }}
      {...props}
    />
  );
}
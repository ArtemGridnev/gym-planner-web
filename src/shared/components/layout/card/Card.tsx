import { Box, type BoxProps, type Theme } from "@mui/material";

type ContentCardProps = BoxProps;

export default function ContentCard({ sx, ...props }: ContentCardProps) {
  return (
    <Box
      sx={[
        (theme: Theme) => {
          const radius = +theme.shape.borderRadius * 3;

          return {
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "common.white",
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
            borderBottomLeftRadius: { xs: 0, sm: radius },
            borderBottomRightRadius: { xs: 0, sm: radius },
            flexDirection: "column",
          };
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}
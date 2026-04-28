import { Box, Stack, Typography } from "@mui/material";
import { ChecklistOutlined } from "@mui/icons-material";

export default function TrainingSessionsComingSoon() {
  return (
    <Box
      sx={{
        maxWidth: 460,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        textAlign: "center",
        gap: 1,
        marginInline: "auto",
      }}
    >
        {/* Icon */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient( 146deg, #328ef8 0%, #8a7cf8 45%, #d865a5 75%, #e05789 100% )",
            color: "primary.contrastText",
          }}
        >
          <ChecklistOutlined sx={{ fontSize: 36 }} />
        </Box>

        <Typography variant="h5" fontWeight={700}>
          Training Sessions coming soon
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Your sessions will be created automatically based on your training schedule. You’ll be able to start a session and mark exercises as done as you go.
        </Typography>
    </Box>
  );
}
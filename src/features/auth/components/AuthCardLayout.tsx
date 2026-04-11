import { Box, Container, Paper, Typography } from "@mui/material";
import logo from "../../../assets/logo/logo.png";
import type { ReactNode } from "react";

type AuthCardLayoutProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthCardLayout({
  title,
  children,
  footer,
}: AuthCardLayoutProps) {
  return (
    <Box sx={{ background: "#f1f1f1" }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          height: "100dvh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            maxWidth: "25rem",
            py: 4,
            px: 3,
            borderRadius: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Gym planner logo"
            sx={{
              width: 56,
              height: 56,
              marginInline: "auto",
              mb: 1.5,
            }}
          />

          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>

          {children}

          {footer && (
            <Box sx={{ mt: 1.5, textAlign: "center" }}>
              {footer}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
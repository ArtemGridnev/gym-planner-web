import { Typography } from "@mui/material";

type EmptyStateMessageProps = {
  message: string;
  'data-testid'?: string;
};

export default function ListNoDataMessage({ 
  message, 
  'data-testid': testId = "list-no-data-message" 
}: EmptyStateMessageProps) {
  return (
    <Typography 
      variant="h6" 
      sx={{ textAlign: "center" }} 
      data-testid={testId}
    >
      {message}
    </Typography>
  );
}
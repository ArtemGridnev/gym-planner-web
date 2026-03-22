import { Typography, type TypographyProps } from "@mui/material";

type EmptyStateMessageProps = TypographyProps & {
  message: string;
  testid?: string;
};

export default function CardError({ 
  message, 
  ...props
}: EmptyStateMessageProps) {
  return (
    <Typography 
      variant="h6" 
      sx={{ textAlign: "center" }} 
      {...props}
    >
      {message}
    </Typography>
  );
}
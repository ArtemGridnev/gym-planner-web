import { LinearProgress } from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";

export default function LoadingBar() {
    const isFetching = useIsFetching();

  if (isFetching === 0) return null;

  return <LinearProgress sx={{ position: 'fixed' }} />;
}
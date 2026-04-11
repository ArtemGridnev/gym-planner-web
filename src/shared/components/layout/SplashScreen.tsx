import { Box } from "@mui/material";
import logo from '../../../assets/logo/logo.png';
import { keyframes } from '@emotion/react';

const pulseAnimation = keyframes`
    0% {
        transform: scale(1);
        opacity: 0.9;
    }
    50% {
        transform: scale(1.05);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0.9;
    }
`;

export default function SplashScreen() {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100dvw",
                height: "100dvh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                component="img"
                src={logo}
                alt="Gym planner logo"
                sx={{ 
                    width: 80, 
                    height: 80,
                    animation: `${pulseAnimation} 2s infinite`
                }}
            />
        </Box>
    );
}
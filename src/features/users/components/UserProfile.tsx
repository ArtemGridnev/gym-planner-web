import { Avatar, Box, Typography, type BoxProps } from "@mui/material";
import { useAuthContext } from "../../auth/context/AuthProvider";

type UserProfileProps = BoxProps & {
    size?: 'small' | 'medium';
};

export default function UserProfile({ size = 'medium' }: UserProfileProps) {
    const { user } = useAuthContext();

    if (!user) return;

    const userFullName = `${user.firstName} ${user.lastName}`;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Avatar 
                sx={{
                    width: size === 'small' ? 32 : 40,
                    height: size === 'small' ? 32 : 40,
                }} 
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    gap: size === 'small' ? 0.25 : 0.75
                }}
            >
                <Typography variant="body2" sx={{ lineHeight: 1 }}>{userFullName}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>{user.email}</Typography>
            </Box>
        </Box>
    );
}
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import logo from '../../../assets/logo/logo.png';
import UserProfile from "../../../features/users/components/UserProfile";
import ButtonMenu from "../ButtonMenu";
import { useAuthContext } from "../../../features/auth/context/AuthProvider";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import type { MenuItemProps } from "../menu/MenuItem";
import { useLayoutContext } from "../../context/layout/useLayoutContext";

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { logout } = useAuthContext();
    const { toggleSidebar } = useLayoutContext();

    const profileMenuItems: MenuItemProps[] = [
        {
            icon: LogoutOutlined,
            text: 'logout',
            onClick: () => logout()
        }
    ];

    return (
        <Box
            component="header"    
            sx={{ 
                display: 'flex', 
                px: { 
                    md: 2,
                    xs: 1
                },
                py: 1,   
            }}
        >
            <Box sx={{ display: 'flex', width: 250, gap: 2 }}>
                {!isMobile && (
                    <IconButton onClick={() => toggleSidebar()}>
                        <MenuOutlined />
                    </IconButton>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                        component="img"
                        src={logo}
                        alt="My Logo"
                        sx={{ width: 40, height: 40 }}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>

                </Box>
                <ButtonMenu items={profileMenuItems}>
                    <UserProfile size="small" />
                </ButtonMenu>
            </Box>
        </Box>
    );
}
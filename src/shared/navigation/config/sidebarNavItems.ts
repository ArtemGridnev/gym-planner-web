import { ChecklistOutlined, FitnessCenterOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import type { SidebarNavItemProps } from "../../components/nav/SidebarNavItem";

export const sidebarNavItems: SidebarNavItemProps[] = [
    {
        path: '/managment/exercises',
        text: "Exercises",
        icon: FitnessCenterOutlined,
        testid: 'exercises-nav-item',
    },
    {
        path: '/managment/trains',
        text: "Trainings",
        icon: SportsMartialArtsOutlined,
        testid: 'trains-nav-item',
    },
    {
        path: '/train-sessions',
        text: 'Train Sessions',
        icon: ChecklistOutlined,
        testid: 'train-sessions-nav-item',
    },
];
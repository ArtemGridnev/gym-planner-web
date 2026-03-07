import { ChecklistOutlined, FitnessCenterOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import type { SidebarNavItemProps } from "../../components/nav/SidebarNavItem";

export const sidebarNavItems: SidebarNavItemProps[] = [
    {
        path: '/managment/exercises',
        text: "Exercises",
        icon: FitnessCenterOutlined,
    },
    {
        path: '/managment/trains',
        text: "Trainings",
        icon: SportsMartialArtsOutlined,
    },
    {
        path: '/train-sessions',
        text: 'Train Sessions',
        icon: ChecklistOutlined
    },
];
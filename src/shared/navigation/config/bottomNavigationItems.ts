import { ChecklistOutlined, FitnessCenterOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import type { BottomNavigationItemProps } from "../../components/layout/bottomNavigation/BottomNavigation";

export const bottomNavigationItems: BottomNavigationItemProps[] = [
    {
        path: '/managment/exercises',
        label: 'Exercises',
        icon: FitnessCenterOutlined,
    },
    {
        path: '/train-sessions',
        label: 'Train Sessions',
        icon: ChecklistOutlined,
    },
    {
        path: '/managment/trains',
        label: 'Trainings',
        icon: SportsMartialArtsOutlined,
    },
];
import { Outlet } from "react-router-dom";
import type { SidebarNavItemProps } from "../../components/nav/SidebarNavItem";
import { ChecklistOutlined, FitnessCenterOutlined, SportsMartialArtsOutlined } from "@mui/icons-material";
import Layout from "../../components/layout/Layout";
import type { BottomNavigationItemProps } from "../../components/layout/bottomNavigation/BottomNavigation";

export default function Dashboard() {
    const navItems: SidebarNavItemProps[] = [
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

    const bottomNavigationItems: BottomNavigationItemProps[] = [
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

    return (
        <Layout sideBarNavItems={navItems} bottomNavigationItems={bottomNavigationItems}>
            <Outlet />
        </Layout>
    );
}
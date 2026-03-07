import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { sidebarNavItems } from "../../navigation/config/sidebarNavItems";
import { bottomNavigationItems } from "../../navigation/config/bottomNavigationItems";

export default function Dashboard() {
    return (
        <Layout sidebarNavItems={sidebarNavItems} bottomNavigationItems={bottomNavigationItems}>
            <Outlet />
        </Layout>
    );
}
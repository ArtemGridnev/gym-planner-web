import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { sidebarNavItems } from "../../navigation/config/sidebarNavItems";
import { bottomNavigationItems } from "../../navigation/config/bottomNavigationItems";
import { ExerciseDetailsProvider } from "../../../features/exercises/context/ExerciseDetailsContext";

export default function Dashboard() {
    return (
        <ExerciseDetailsProvider>
            <Layout
                sidebarNavItems={sidebarNavItems}
                bottomNavigationItems={bottomNavigationItems}
            >
                <Outlet />
            </Layout>
        </ExerciseDetailsProvider>
    );
}
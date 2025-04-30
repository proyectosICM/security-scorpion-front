
import { Login } from "./pages/auth/login";
import { DashboardIndex } from "./pages/dashboard";
import { ManageCamerasIndex } from "./pages/manage-cameras";
import { ManageGroupsIndex } from "./pages/manage-groups";
import { ViewCamerasIndex } from "./pages/view-cameras";


export const routes = [
    { path: "/", component: <DashboardIndex /> },
    { path: "/dashboard", component: <DashboardIndex /> },
    { path: "/view-cameras", component: <ViewCamerasIndex /> },
    { path: "/manage-groups", component: <ManageGroupsIndex /> },
    { path: "/manage-cameras", component: <ManageCamerasIndex /> },
    { path: "/login", component: <Login /> },
];
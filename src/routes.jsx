
import { Login } from "./pages/auth/login";
import { DashboardIndex } from "./pages/dashboard";
import { ManageGroupsIndex } from "./pages/manage-groups";


export const routes = [
    { path: "/", component: <DashboardIndex /> },
    { path: "/dashboard", component: <DashboardIndex /> },
    { path: "/manage-groups", component: <ManageGroupsIndex /> },
    { path: "/login", component: <Login /> },
];
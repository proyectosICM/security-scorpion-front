
import { Login } from "./pages/auth/login";
import { DashboardIndex } from "./pages/dashboard";


export const routes = [
    { path: "/", component: <DashboardIndex /> },
    { path: "/dashboard", component: <DashboardIndex /> },
    { path: "/login", component: <Login /> },
];
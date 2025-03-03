import { DashboardIndex } from "./pages";
import { Login } from "./pages/auth/login";


export const routes = [
    { path: "/", component: <DashboardIndex /> },
    { path: "/login", component: <Login /> },
];
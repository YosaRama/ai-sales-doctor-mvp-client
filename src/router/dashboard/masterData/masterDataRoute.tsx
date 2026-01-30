import { createRoute, Outlet } from "@tanstack/react-router";
import { dashboardRoute } from "@/router/dashboard/dashboardRoute";

export const masterDataRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "master-data",
  component: () => <Outlet />,
});

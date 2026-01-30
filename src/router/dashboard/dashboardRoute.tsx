import { LayoutDashboard } from "@/components/layout/dashboard";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/router/rootRoute";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dashboard",
  component: LayoutDashboard,
});

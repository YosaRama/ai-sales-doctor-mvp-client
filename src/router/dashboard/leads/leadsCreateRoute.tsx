import { createRoute } from "@tanstack/react-router";
import { Page } from "@/pages/leads/create";
import { dashboardRoute } from "@/router/dashboard/dashboardRoute";

export const leadsCreateRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/leads/create",
  component: Page,
});

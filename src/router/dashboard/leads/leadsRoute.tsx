import { createRoute } from "@tanstack/react-router";
import { dashboardRoute } from "@/router/dashboard/dashboardRoute";
import { Page } from "@/pages/leads/index";

export const leadsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "leads",
  component: Page,
});

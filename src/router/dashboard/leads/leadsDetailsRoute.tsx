import { createRoute } from "@tanstack/react-router";
import { Page } from "@/pages/leads/details";
import { dashboardRoute } from "@/router/dashboard/dashboardRoute";

export const leadsDetailsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/leads/$id",
  component: Page,
});

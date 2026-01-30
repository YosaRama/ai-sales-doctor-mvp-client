import { createRoute } from "@tanstack/react-router";
import { Page } from "@/pages/master-data/industry/details";
import { masterDataRoute } from "@/router/dashboard/masterData/masterDataRoute";

export const industryDetailsRoute = createRoute({
  getParentRoute: () => masterDataRoute,
  path: "/industry/$id",
  component: Page,
});

import { createRoute } from "@tanstack/react-router";
import { Page } from "@/pages/master-data/industry/create";
import { masterDataRoute } from "@/router/dashboard/masterData/masterDataRoute";

export const industryCreateRoute = createRoute({
  getParentRoute: () => masterDataRoute,
  path: "/industry/create",
  component: Page,
});

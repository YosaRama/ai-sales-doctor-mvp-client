import { createRoute } from "@tanstack/react-router";
import { Page } from "@/pages/master-data/industry/index";
import { masterDataRoute } from "../masterDataRoute";

export const industryRoute = createRoute({
  getParentRoute: () => masterDataRoute,
  path: "industry",
  component: Page,
});

// router/index.ts
import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { dashboardRoute } from "./dashboard/dashboardRoute";

import { leadsRoute } from "./dashboard/leads/leadsRoute";
import { leadsCreateRoute } from "./dashboard/leads/leadsCreateRoute";
import { leadsDetailsRoute } from "./dashboard/leads/leadsDetailsRoute";

import { industryRoute } from "./dashboard/masterData/industry/industryRoute";
import { industryCreateRoute } from "./dashboard/masterData/industry/industryCreateRoute";
import { industryDetailsRoute } from "./dashboard/masterData/industry/industryDetailsRoute";
import { masterDataRoute } from "./dashboard/masterData/masterDataRoute";
import { indexRoute } from "./indexRoute";

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    leadsRoute,
    leadsCreateRoute,
    leadsDetailsRoute,
    masterDataRoute.addChildren([
      industryRoute,
      industryCreateRoute,
      industryDetailsRoute,
    ]),
  ]),
]);

export const router = createRouter({ routeTree });

import type { Route } from '@/modules/core/types/route';
import { routesConfig } from '@/modules/core/config/routes';

type RouteMap = Map<string, Route>;

const routeMap: RouteMap = new Map();

function flattenRoutes(route: Route) {
  routeMap.set(route.fullPath, route);

  for (const sub of route.sub || []) {
    flattenRoutes(sub);
  }
}

flattenRoutes(routesConfig);

export function getFlattenedRouteMap(): RouteMap {
  return routeMap;
}

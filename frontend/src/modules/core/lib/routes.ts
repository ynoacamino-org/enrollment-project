import type { Route } from '@/modules/core/types/route';
import { getFlattenedRouteMap } from '@/modules/core/lib/route-map';

const routeMap = getFlattenedRouteMap();

export function getRouteFromPath(path: string): Route {
  console.log('Path: ', path);
  const cleanPath = path.replace(/\/+$/, '') || '/';

  // Buscar ruta exacta
  if (routeMap.has(cleanPath)) return routeMap.get(cleanPath)!;

  // Buscar ruta que coincida con segmentos dinámicos (ej. /instituciones/123)
  for (const [pattern, route] of routeMap.entries()) {
    const routeSegments = pattern.split('/').filter(Boolean);
    const pathSegments = cleanPath.split('/').filter(Boolean);

    if (routeSegments.length !== pathSegments.length) continue;

    const isMatch = routeSegments.every(
      (seg, i) => seg.startsWith(':') || seg === pathSegments[i],
    );
    if (isMatch) {
      const calculatedRoute: Route = {
        ...route,
        fullPath: cleanPath,
      };
      console.log('Clean path: ', cleanPath);
      return calculatedRoute;
    }
  }
  return {} as Route;
}

export const NOT_FOUND_ROUTE = getRouteFromPath('/not-found');
export const UNAUTHORIZED_ROUTE = getRouteFromPath('/unauthorized');

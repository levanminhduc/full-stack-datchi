export const ROUTES = {
  HOME: '/',
  TODOS: '/todos',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];


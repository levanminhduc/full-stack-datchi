export const ROUTES = {
  HOME: '/',
  TODOS: '/todos',
  EMPLOYEES: '/employees',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];


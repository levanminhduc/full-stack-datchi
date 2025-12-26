export const ROUTES = {
  HOME: '/',
  TODOS: '/todos',
  EMPLOYEES: '/employees',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];


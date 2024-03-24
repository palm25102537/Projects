export interface AppRoute {
  path: string;
  component: () => JSX.Element;
}

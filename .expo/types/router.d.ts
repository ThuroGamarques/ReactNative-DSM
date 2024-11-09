/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/componentes/adaptadores/cadastro-produto` | `/componentes/adaptadores/item-produto` | `/componentes/adaptadores/lista-produtos` | `/models/produto` | `/style/default`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}

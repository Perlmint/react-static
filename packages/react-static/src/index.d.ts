// Type definitions for react-static 7.1.0
// Project: https://github.com/nozzle/react-static
// Definitions for 4.0.1 by: D1no <https://github.com/D1no>
// Updated to 5.1.7 by: Balvajs <https://github.com/Balvajs>
// TypeScript Version: 3.4
// VERY lightly maintained, we need all the help we can get

declare module 'react-static' {
  import * as React from 'react'
  import { ComponentType, ReactNodeArray } from 'react'
  import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server'
  // Passing on helmet typings as "Head"
  import { Helmet as Head } from 'react-helmet'

  type AnyReactComponent = ComponentType<Record<string, any>>

  export interface RootProps {
    children: React.ReactNode
  }
  export class Root extends React.Component<RootProps> {}
  export interface RoutesProps {
    children?: React.ReactNode
    routePath?: string
  }
  export class Routes extends React.Component<RoutesProps> {}

  export function useRouteData<T = any>(): T
  export function useSiteData<T = any>(): T
  export function usePrefetch<T = any>(path: string, ref?: React.MutableRefObject<T>): React.MutableRefObject<T>
  export function useLocation(): any
  export function useBasePath(): string
  export function useStaticInfo(): any
  export function useRoutePath(routePath?: string): string

  export class RouteData<T = any> extends React.Component<{ children?: AnyReactComponent[] }> {}
  export function withRouteData<T = any, P = {}>(comp: React.Component<P & T>): React.FunctionComponent<P>

  export class SiteData<T = any> extends React.Component<{ children?: AnyReactComponent[] }> {}
  export function withSiteData<T = any, P = {}>(comp: React.Component<P & T>): React.FunctionComponent<P>

  export function addPrefetchExcludes(arg: Array<string | RegExp>): void
  export interface RouteInfoOptions {
    priority: boolean
  }
  export function getRouteInfo(path: string, options?: RouteInfoOptions): Promise<any | void>
  export function isPrefetchableRoute(path: string): boolean
  export type ReloadClientDataHandler = () => void
  export function onReloadClientData(fn: ReloadClientDataHandler): () => void
  export interface onReloadClientData {
    listeners: ReloadClientDataHandler[],
  }
  export type ReloadTemplatesHandler = () => void
  export function onReloadTemplates(fn: ReloadTemplatesHandler): () => void
  export interface onReloadTemplates {
    listeners: ReloadTemplatesHandler[],
  }
  export type Plugin = any
  export type AsyncPluginHook = (comp: AnyReactComponent, options: any) => Promise<AnyReactComponent | void>
  export type SyncPluginHook = (comp: AnyReactComponent, options: any) => AnyReactComponent | void
  export type PluginHook = AsyncPluginHook | SyncPluginHook
  export const pluginHooks: PluginHook[]
  export const plugins: {
    Root(comp: AnyReactComponent): AnyReactComponent,
    Routes(comp: AnyReactComponent): AnyReactComponent,
  }
  export interface PrefetchOptions {
    priority: boolean
  }
  export interface PrefetchDataOptions extends PrefetchOptions {
    type: 'data'
  }
  export function prefetch<Data = any>(path: string, options?: PrefetchDataOptions): Promise<Data>
  export interface PrefetchTemplateOptions extends PrefetchOptions {
    type: 'template'
  }
  export function prefetch(path: string, options?: PrefetchTemplateOptions): Promise<void>
  export function prefetchData<Data = any>(path: string, options?: PrefetchOptions): Promise<Data>
  export function prefetchTemplate(path: string, options?: PrefetchOptions): Promise<void>
  export function registerPlugins(plugins: Plugin[]): void
  export function registerTemplateForPath(path: string, template: string): void
  export function registerTemplates(tmps: {[key: string]: Template}, notFoundKey: string): Promise<void>
  export const routeErrorByPath: {[path: string]: boolean}
  export const routeInfoByPath: {[path: string]: RouteInfo}
  export interface RouteInfo extends Route {
    templateLoaded: boolean
  }
  export const sharedDataByHash: {[hash: string]: SharedData<any>}
  export const templateErrorByPath: {[path: string]: boolean}
  export const templates: {[key: string]: Template}
  export const templatesByPath: {[path: string]: Template}
  export interface Template {
    preload?(): Promise<any>
  }
  export function getRoutePath(routePath: string): string
  export function makePathAbsolute(path: string): string
  export function pathJoin(...paths: string[]): string

  /**
   * @see https://github.com/nozzle/react-static/blob/master/docs/config.md
   */
  export interface ReactStaticConfig<SITE_DATA = any> {
    entry?: string
    getRoutes?(flags: RouteFlags): PromiseLike<Route[]> | Route[]
    getSiteData?(flags: RouteFlags): PromiseLike<SITE_DATA> | SITE_DATA
    siteRoot?: string
    stagingSiteRoot?: string
    basePath?: string
    stagingBasePath?: string
    devBasePath?: string
    assetsPath?: string
    extractCssChunks?: boolean
    inlineCss?: boolean
    Document?(props: DocumentProps<SITE_DATA>): React.ReactElement
    devServer?: WebpackDevServerConfig
    paths?: PathsConfig
    outputFileRate?: number
    prefetchRate?: number
    disableDuplicateRoutesWarning?: boolean
    disableRoutePrefixing?: boolean
    maxThreads?: number
    minLoadTime?: number
    disablePreload?: boolean
    babelExcludes?: RegExp[]
    productionSourceMaps?: boolean
    plugins?: Array<string | [string, object] | [string]>
  }

  export interface PathsConfig {
    root?: string
    src?: string
    temp?: string
    dist?: string
    devDist?: string
    public?: string
    assets?: string
    pages?: string
    plugins?: string
    nodeModules?: string
  }

  export interface RouteFlags {
    stage: string,
    dev: boolean,
  }

  export interface Route {
    path: string
    template?: string
    redirect?: string
    children?: Route[]
    getData?(resolvedRoute: Route, flags: RouteFlags, dev: boolean): any
    sharedData?: {[key: string]: SharedData<any>}
  }

  export interface DocumentState<SITE_DATA> {
    routeInfo: any
    siteData: SITE_DATA
    renderMeta: any
  }
  export interface DocumentProps<SITE_DATA> {
    Html: React.FunctionComponent<React.HTMLProps<HTMLHtmlElement>>
    Head: typeof Head
    Body: React.FunctionComponent<React.HTMLProps<HTMLBodyElement>>
    children: React.ReactElement
    state: DocumentState<SITE_DATA>
  }

  export interface OnStartArgs {
    devServerConfig: Readonly<WebpackDevServerConfig>
  }

  export interface SharedData<T> {
    sharedData: never;
  }
}

declare module 'react-static/node' {
  export function rebuildRoutes(paths?: string[]): Promise<void>
  type Route = import('react-static').Route
  export interface MakePageRoutesOptions<ITEM> {
    items: ITEM[];
    pageSize: number;
    route: Route;
    decorate(items: ITEM[], pageIndex: number, totalPages: number): Partial<Route>;
    pageToken?: string;
  }
  export type PageRoute<ITEM> = Route[]
  export function makePageRoutes<ITEM>(makePageRoutesOptions: MakePageRoutesOptions<ITEM>): PageRoute<ITEM>
  type SharedData<T> = import('react-static').SharedData<T>
  export function createSharedData<T>(data: T): SharedData<T>
}
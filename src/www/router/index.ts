export { default as Router } from "./router";
export type { RouteChange } from "./router";

import config from './index.json'

export const docsRoute: Record<string, { title: string; value: string; href: string }[]> = config
import { $t } from "@/plugins/i18n";
import {
  type Router,
  type RouteRecordRaw,
  type RouteComponent,
  createRouter
} from "vue-router";
import remainingRoute from "./modules/remaining";
import { getHistoryMode } from "./utils";
const routes: RouteRecordRaw[] = [
  ...remainingRoute
]
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes
})

export default router
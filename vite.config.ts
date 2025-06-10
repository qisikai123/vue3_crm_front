import vue from '@vitejs/plugin-vue'
import {
  root,
  alias,
  wrapperEnv,
  pathResolve,
  __APP_INFO__
} from "./build/utils";
import { getPluginsList } from "./build/plugins";
import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH, VITE_ROUTER_HISTORY } =
  wrapperEnv(loadEnv(mode, root));
  return {
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    resolve: {
      alias
    }
  }
};
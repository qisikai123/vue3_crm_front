import { createApp } from 'vue'
import App from './App.vue'
import { getPlatformConfig } from './config'
import { injectResponsiveStorage } from './utils/storage'
import { useI18n } from "@/plugins/i18n";
import { useVxeTable } from "@/plugins/vxeTable";
import { useEcharts } from "@/plugins/echarts";
import { useElementPlus } from "@/plugins/elementPlus";
import router from './router'

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
import "element-plus/dist/index.css";

const app = createApp(App)

getPlatformConfig(app).then((config) => {
  injectResponsiveStorage(app, config)
  app.use(useI18n).use(useVxeTable).use(useEcharts).use(useElementPlus)
  app.use(router)
  app.mount('#app')
})

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_PORT: number
  readonly VITE_ROUTER_HISTORY: string
  // 可以根据需要添加更多环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 

/**
 * 对应 `public/platform-config.json` 文件的类型声明
 */
interface PlatformConfigs {
  ResponsiveStorageNameSpace?: string;
  [key: string]: any;
}
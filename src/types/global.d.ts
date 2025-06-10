/// <reference types="vite/client" />
import type { ECharts } from "echarts";
import type { TableColumns } from "@pureadmin/table";

declare global {
  interface ImportMetaEnv {
    readonly VITE_PUBLIC_PATH: string;
    readonly VITE_PORT: number;
    readonly VITE_ROUTER_HISTORY: string;
    // 可以根据需要添加更多环境变量
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  /**
   * 对应 `public/platform-config.json` 文件的类型声明
   */
  interface PlatformConfigs {
    ResponsiveStorageNameSpace?: string;
    [key: string]: any;
  }

  /**
   * 全局自定义环境变量的类型声明
   * @see {@link https://pure-admin.cn/pages/config/#%E5%85%B7%E4%BD%93%E9%85%8D%E7%BD%AE}
   */
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: string;
    VITE_COMPRESSION: ViteCompression;
  }

  type TableColumnList = Array<TableColumns>;

  /**
   * `responsive-storage` 本地响应式 `storage` 的类型声明
   */
  interface ResponsiveStorage {
    locale: {
      locale?: string;
    };
  }

  /**
   * 平台里所有组件实例都能访问到的全局属性对象的类型声明
   */
  interface GlobalPropertiesApi {
    $echarts: ECharts;
    $storage: ResponsiveStorage;
    $config: PlatformConfigs;
  }

  /**
   * 与 `PlatformConfigs` 类型不同，这里是缓存到浏览器本地存储的类型声明
   * @see {@link https://pure-admin.cn/pages/config/#platform-config-json}
   */
  interface StorageConfigs {
    version?: string;
    title?: string;
    fixedHeader?: boolean;
    hiddenSideBar?: boolean;
    multiTagsCache?: boolean;
    keepAlive?: boolean;
    locale?: string;
    layout?: string;
    theme?: string;
    darkMode?: boolean;
    grey?: boolean;
    weak?: boolean;
    hideTabs?: boolean;
    hideFooter?: boolean;
    sidebarStatus?: boolean;
    epThemeColor?: string;
    themeColor?: string;
    overallStyle?: string;
    showLogo?: boolean;
    showModel?: string;
    menuSearchHistory?: number;
    mapConfigure?: {
      amapKey?: string;
      options: {
        resizeEnable?: boolean;
        center?: number[];
        zoom?: number;
      };
    };
    username?: string;
  }
}

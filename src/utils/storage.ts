// 响应式storage
import type { App } from "vue";
import Storage from "responsive-storage";
import { responsiveStorageNameSpace } from "@/config";

export const injectResponsiveStorage = (app: App, config: PlatformConfigs) => {
  const nameSpace = responsiveStorageNameSpace();
  const configObj = Object.assign(
    {
      // 国际化 默认中文zh
      locale: Storage.getData("locale", nameSpace) ?? {
        locale: config.Locale ?? "zh"
      },
    }
  );

  app.use(Storage, { nameSpace, memory: configObj });
};

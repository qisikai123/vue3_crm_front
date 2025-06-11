import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGlobal } from '@pureadmin/utils'

export function useLayout() {
  const { $storage, $config } = useGlobal<GlobalPropertiesApi>()

  /** 清空缓存后从platform-config.json读取默认配置并赋值到storage中 */
  const layout = computed(() => {
    return $storage?.layout.layout
  })

  const layoutTheme = computed(() => {
    return $storage.layout
  })

  return {
    layout,
    layoutTheme,
  }
}

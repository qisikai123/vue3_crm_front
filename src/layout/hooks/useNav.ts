import { useGlobal } from '@pureadmin/utils'
import { computed } from 'vue'
import { useEpThemeStoreHook } from '@/store/modules/epTheme'

export const useNav = () => {
  const { $storage } = useGlobal<GlobalPropertiesApi>()

  function handleResize(menuRef: any) {
    menuRef?.handleResize()
  }

  /** 设置国际化选中后的样式 */
  const getDropdownItemStyle = computed(() => {
    return (locale, t) => {
      return {
        background: locale === t ? useEpThemeStoreHook().epThemeColor : '',
        color: locale === t ? '#f4f4f5' : '#000',
      }
    }
  })

  const getDropdownItemClass = computed(() => {
    return (locale, t) => {
      return locale === t ? '' : 'dark:hover:text-primary!'
    }
  })

  return {
    $storage,
    handleResize,
    getDropdownItemStyle,
    getDropdownItemClass,
  }
}

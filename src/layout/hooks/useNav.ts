import { useGlobal } from '@pureadmin/utils'
import { computed, type CSSProperties } from 'vue'
import { useEpThemeStoreHook } from '@/store/modules/epTheme'
import { useAppStoreHook } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { emitter } from '@/utils/mitt'
import { router, remainingPaths } from '@/router'
import { getConfig } from '@/config'

const tooltipEffect = getConfig()?.TooltipEffect ?? 'light'

export const useNav = () => {
  const { wholeMenus } = storeToRefs(usePermissionStoreHook())

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

  const device = computed(() => {
    return pureApp.getDevice
  })

  const pureApp = useAppStoreHook()

  const isCollapse = computed(() => {
    return !pureApp.getSidebarStatus
  })

  function menuSelect(indexPath: string) {
    if (wholeMenus.value.length === 0 || isRemaining(indexPath)) return
    emitter.emit('changLayoutRoute', indexPath)
  }

  /** 判断路径是否参与菜单 */
  function isRemaining(path: string) {
    return remainingPaths.includes(path)
  }

  function toggleSideBar() {
    pureApp.toggleSideBar()
  }

  const { $storage, $config } = useGlobal<GlobalPropertiesApi>()
  const title = computed(() => {
    return $config.Title
  })

  const layout = computed(() => {
    return $storage?.layout?.layout
  })

  /** 获取`logo` */
  function getLogo() {
    return new URL('/logo.svg', import.meta.url).href
  }

  const getDivStyle = computed((): CSSProperties => {
    return {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
    }
  })

  return {
    $storage,
    handleResize,
    getDropdownItemStyle,
    getDropdownItemClass,
    device,
    pureApp,
    isCollapse,
    tooltipEffect,
    menuSelect,
    toggleSideBar,
    title,
    getLogo,
    layout,
    getDivStyle,
  }
}

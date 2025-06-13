<script lang="ts" setup>
import 'animate.css'
import '@/components/ReIcon/src/offlineIcon'
import { setType } from './types'
import { useI18n } from 'vue-i18n'
import { ref, computed, reactive } from 'vue'
import { useAppStoreHook } from '@/store/modules/app'
import { useSettingStoreHook } from '@/store/modules/settings'
import {
  useDark,
  useGlobal,
  deviceDetection,
  useResizeObserver,
} from '@pureadmin/utils'
import { useLayout } from './hooks/useLayout'

const { t } = useI18n()
const { isDark } = useDark()
const { layout } = useLayout()
const pureSetting = useSettingStoreHook()
const { $storage } = useGlobal<GlobalPropertiesApi>()

const appWrapperRef = ref(null)

const set: setType = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar
  }),

  device: computed(() => {
    return useAppStoreHook().device
  }),

  fixedHeader: computed(() => {
    return pureSetting.fixedHeader
  }),

  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === 'mobile',
    }
  }),

  hideTabs: computed(() => {
    return $storage?.configure.hideTabs
  }),
})
</script>
<template>
  <div ref="appWrapperRef" :class="['app-wrapper', set.classes]">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    clear: both;
    display: table;
    content: '';
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>

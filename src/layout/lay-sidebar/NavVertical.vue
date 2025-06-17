<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@/layout/hooks/useNav'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { storageLocal, isAllEmpty } from '@pureadmin/utils'
import { responsiveStorageNameSpace } from '@/config'
import LaySidebarLogo from '../lay-sidebar/components/SidebarLogo.vue'
import { useRoute } from 'vue-router'
import LaySidebarItem from './components/SidebarItem.vue'

const route = useRoute()
const {
  device,
  pureApp,
  isCollapse,
  tooltipEffect,
  menuSelect,
  toggleSideBar,
} = useNav()

const subMenuData = ref([])
const showLogo = ref(
  storageLocal().getItem<StorageConfigs>(
    `${responsiveStorageNameSpace()}configure`
  )?.showLogo ?? true
)
const isShow = ref(false)

const menuData = computed(() => {
  return pureApp.layout === 'mix' && device.value !== 'mobile'
    ? subMenuData.value
    : usePermissionStoreHook().wholeMenus
})
console.log(menuData.value, 'menuData')

const loading = computed(() =>
  pureApp.layout === 'mix' ? false : menuData.value.length === 0 ? true : false
)

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
)
</script>
<template>
  <div
    v-loading="loading"
    :class="['sidebar-container', showLogo ? 'has-logo' : 'no-logo']"
    @mouseenter.prevent="isShow = true"
    @mouseleave.prevent="isShow = false"
  >
    <LaySidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :class="[device === 'mobile' ? 'mobile' : 'pc']"
    >
      <el-menu
        unique-opened
        mode="vertical"
        popper-class="pure-scrollbar"
        class="outer-most select-none"
        :collapse="isCollapse"
        :collapse-transition="false"
        :popper-effect="tooltipEffect"
        :default-active="defaultActive"
      >
        <LaySidebarItem
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
          class="outer-most select-none"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: "SidebarFullScreen"
};
</script>

<script lang="ts" setup>
import { useNav } from "@/layout/hooks/useNav";
import { watch, ref } from "vue";

const { toggle, isFullscreen, ExitFullscreen, Fullscreen } = useNav();

const screenIcon = ref();

watch(
  isFullscreen,
  val => {
    screenIcon.value = val ? ExitFullscreen : Fullscreen;
  },
  { immediate: true }
);
</script>

<template>
  <span class="fullscreen-icon navbar-bg-hover" @click="toggle">
    <IconifyIconOffline :icon="screenIcon" />
  </span>
</template>

<style lang="scss" scoped></style>

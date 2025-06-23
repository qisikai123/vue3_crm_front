<script lang="ts">
export default {
  name: "LaySearch"
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import SearchIcon from "~icons/ep/search";
import SearchModel from "./components/SearchModel.vue";

const show = ref(false);
</script>

<template>
  <div
    class="search-container w-[40px] h-[40px] flex-c cursor-pointer navbar-bg-hover"
    @click="show = true"
  >
    <IconifyIconOffline :icon="SearchIcon" />
  </div>
  <SearchModel v-model:value="show" />
</template>

<style lang="scss" scoped></style>

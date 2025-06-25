<script lang="ts">
export default {
  name: "Redirect"
};
</script>

<script setup lang="ts">
import { unref, defineOptions } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "Redirect"
});

const { currentRoute, replace } = useRouter();

const { params, query } = unref(currentRoute);
const { path } = params;

// 可能会存在多级路由，所以需要拼接
const _path = Array.isArray(path) ? path.join("/") : path;

replace({
  path: "/" + _path,
  query
});
</script>

<template>
  <div />
</template>

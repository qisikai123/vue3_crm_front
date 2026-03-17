<script lang="ts">
export default {
  name: "fileQuery"
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getFileList } from "@/api/fileQuery";
import { useColumns } from "./column";

const { columns } = useColumns();

type TableDataType = {
  id: number;
  filename: string;
  mine_type: string;
};

const tableData = ref<TableDataType[]>([]);

onMounted(async () => {
  let { data } = await getFileList();
  if (Array.isArray(data)) {
    tableData.value = data;
  }
});
</script>

<template>
  <div>
    <pure-table :data="tableData" :columns="columns" />
  </div>
</template>

<style lang="scss" scoped></style>

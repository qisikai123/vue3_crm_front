<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
    <ReDrawer />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import plusEn from "plus-pro-components/es/locale/lang/en";
import plusZhCn from "plus-pro-components/es/locale/lang/zh-cn";
import { ReDialog } from "@/components/ReDialog";
import { ReDrawer } from "@/components/ReDrawer";

export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
    ReDialog,
    ReDrawer
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale == "zh"
        ? { ...zhCn, ...plusZhCn }
        : { ...en, ...plusEn };
    }
  }
});
</script>

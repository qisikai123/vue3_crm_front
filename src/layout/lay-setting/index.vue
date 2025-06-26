<script lang="ts">
export default {
  name: "LaySetting"
};
</script>

<script lang="ts" setup>
import LayPanel from "../lay-panel/index.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import Segmented, { type OptionsType } from "@/components/ReSegmented";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { useDark, useGlobal, debounce, isNumber } from "@pureadmin/utils";
import { useAppStoreHook } from "@/store/modules/app";
import { useNav } from "@/layout/hooks/useNav";

import DayIcon from "@/assets/svg/day.svg?component";
import DarkIcon from "@/assets/svg/dark.svg?component";
import SystemIcon from "@/assets/svg/system.svg?component";
import Check from "~icons/ep/check";

const { isDark } = useDark();

const { $storage } = useGlobal<GlobalPropertiesApi>();

const { device } = useNav();

const {
  dataTheme,
  overallStyle,
  layoutTheme,
  themeColors,
  toggleClass,
  dataThemeChange,
  setLayoutThemeColor
} = useDataThemeChange();

const { t } = useI18n();

const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

const pClass = computed(() => {
  return ["mb-[12px]!", "font-medium", "text-sm", "dark:text-white"];
});

const themeOptions = computed<Array<OptionsType>>(() => {
  return [
    {
      label: t("panel.pureOverallStyleLight"),
      icon: DayIcon,
      theme: "light",
      tip: t("panel.pureOverallStyleLightTip"),
      iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
    },
    {
      label: t("panel.pureOverallStyleDark"),
      icon: DarkIcon,
      theme: "dark",
      tip: t("panel.pureOverallStyleDarkTip"),
      iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
    },
    {
      label: t("panel.pureOverallStyleSystem"),
      icon: SystemIcon,
      theme: "system",
      tip: t("panel.pureOverallStyleSystemTip"),
      iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
    }
  ];
});

/** 监听操作系统主题改变 */
function watchSystemThemeChange() {
  updateTheme();
  removeMatchMedia();
  mediaQueryList.addEventListener("change", updateTheme);
}

/** 根据操作系统主题设置平台整体风格 */
function updateTheme() {
  if (overallStyle.value !== "system") return;
  if (mediaQueryList.matches) {
    dataTheme.value = true;
  } else {
    dataTheme.value = false;
  }
  dataThemeChange(overallStyle.value);
}

function removeMatchMedia() {
  mediaQueryList.removeEventListener("change", updateTheme);
}

/** 当网页整体为暗色风格时不显示亮白色主题配色切换选项 */
const showThemeColors = computed(() => {
  return themeColor => {
    return themeColor === "light" && isDark.value ? false : true;
  };
});

const getThemeColorStyle = computed(() => {
  return color => {
    return { background: color };
  };
});

/** 主题色 激活选择项 */
const getThemeColor = computed(() => {
  return current => {
    if (
      current === layoutTheme.value.theme &&
      layoutTheme.value.theme !== "light"
    ) {
      return "#fff";
    } else if (
      current === layoutTheme.value.theme &&
      layoutTheme.value.theme === "light"
    ) {
      return "#1d2b45";
    } else {
      return "transparent";
    }
  };
});

/** 设置导航模式 */
function setLayoutModel(layout: string) {
  layoutTheme.value.layout = layout;
  window.document.body.setAttribute("layout", layout);
  $storage.layout = {
    layout,
    theme: layoutTheme.value.theme,
    darkMode: $storage.layout?.darkMode,
    sidebarStatus: $storage.layout?.sidebarStatus,
    epThemeColor: $storage.layout?.epThemeColor,
    themeColor: $storage.layout?.themeColor,
    overallStyle: $storage.layout?.overallStyle
  };
  useAppStoreHook().setLayout(layout);
}
</script>

<template>
  <LayPanel>
    <div class="p-5">
      <!-- 主题切换 -->
      <p :class="pClass">{{ t("panel.pureOverallStyle") }}</p>
      <Segmented
        resize
        class="select-none"
        :modelValue="overallStyle === 'system' ? 2 : dataTheme ? 1 : 0"
        :options="themeOptions"
        @change="
          theme => {
            theme.index === 1 && theme.index !== 2
              ? (dataTheme = true)
              : (dataTheme = false);
            overallStyle = theme.option.theme;
            dataThemeChange(theme.option.theme);
            theme.index === 2 && watchSystemThemeChange();
          }
        "
      />

      <!-- 主题色切换 -->
      <p :class="['mt-5!', pClass]">{{ t("panel.pureThemeColor") }}</p>
      <ul class="theme-color">
        <li
          v-for="(item, index) in themeColors"
          v-show="showThemeColors(item.themeColor)"
          :key="index"
          :style="getThemeColorStyle(item.color)"
          @click="setLayoutThemeColor(item.themeColor)"
        >
          <el-icon
            style="margin: 0.1em 0.1em 0 0"
            :size="17"
            :color="getThemeColor(item.themeColor)"
          >
            <IconifyIconOffline :icon="Check" />
          </el-icon>
        </li>
      </ul>

      <!-- 布局模式切换 -->
      <p :class="['mt-5!', pClass]">{{ t("panel.pureLayoutModel") }}</p>
      <ul class="pure-theme">
        <li
          ref="verticalRef"
          v-tippy="{
            content: t('panel.pureVerticalTip'),
            zIndex: 41000
          }"
          :class="layoutTheme.layout === 'vertical' ? 'is-select' : ''"
          @click="setLayoutModel('vertical')"
        >
          <div />
          <div />
        </li>
        <li
          v-if="device !== 'mobile'"
          ref="horizontalRef"
          v-tippy="{
            content: t('panel.pureHorizontalTip'),
            zIndex: 41000
          }"
          :class="layoutTheme.layout === 'horizontal' ? 'is-select' : ''"
          @click="setLayoutModel('horizontal')"
        >
          <div />
          <div />
        </li>
        <li
          v-if="device !== 'mobile'"
          ref="mixRef"
          v-tippy="{
            content: t('panel.pureMixTip'),
            zIndex: 41000
          }"
          :class="layoutTheme.layout === 'mix' ? 'is-select' : ''"
          @click="setLayoutModel('mix')"
        >
          <div />
          <div />
        </li>
      </ul>
    </div>
  </LayPanel>
</template>

<style lang="scss" scoped>
:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: 700;
}

:deep(.el-switch__core) {
  --el-switch-off-color: var(--pure-switch-off-color);

  min-width: 36px;
  height: 18px;
}

:deep(.el-switch__core .el-switch__action) {
  height: 14px;
}

.theme-color {
  height: 20px;

  li {
    float: left;
    height: 20px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 4px;

    &:nth-child(1) {
      border: 1px solid #ddd;
    }
  }
}

.pure-theme {
  display: flex;
  gap: 12px;

  li {
    position: relative;
    width: 46px;
    height: 36px;
    overflow: hidden;
    cursor: pointer;
    background: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &:nth-child(1) {
      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #1b2a47;
        }

        &:nth-child(2) {
          position: absolute;
          top: 0;
          right: 0;
          width: 70%;
          height: 30%;
          background: #fff;
          box-shadow: 0 0 1px #888;
        }
      }
    }

    &:nth-child(2) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }
      }
    }

    &:nth-child(3) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }

        &:nth-child(2) {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30%;
          height: 70%;
          background: #fff;
          box-shadow: 0 0 1px #888;
        }
      }
    }
  }
}

.is-select {
  border: 2px solid var(--el-color-primary);
}

.setting {
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
    font-size: 14px;
  }
}
</style>

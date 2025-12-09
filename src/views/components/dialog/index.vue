<script lang="tsx" setup>
import { useRouter } from "vue-router";
import { h, createVNode, ref } from "vue";
import { message } from "@/utils/message";
import formPrimitive from "./formPrimitive.vue";
import forms, { type FormProps } from "./form.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import {
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
} from "@/components/ReDialog";

defineOptions({
  name: "ReDialog"
});

const router = useRouter();

function onBaseClick() {
  addDialog({
    title: "基础弹框",
    contentRenderer: () => <p>基础弹框</p>
  });
}

function onDraggableClick() {
  addDialog({
    title: "可拖拽弹框",
    draggable: true,
    contentRenderer: () => h("p", "可拖拽弹框")
  });
}

function onFullscreenClick() {
  addDialog({
    title: "弹框内容-全屏",
    fullscreen: true,
    contentRenderer: () => h("p", "全屏弹框")
  });
}

function onFullscreenIconClick() {
  addDialog({
    title: "全屏弹框事件",
    fullscreenIcon: true,
    fullscreenCallBack: ({ options }) => {
      message(`全屏弹框事件: ${options.title}`);
    },
    contentRenderer: () => h("p", "全屏弹框事件")
  });
}

function onNoMaskClick() {
  addDialog({
    title: "无遮罩弹框",
    modal: false,
    contentRenderer: () => h("p", "无遮罩弹框")
  });
}

function onStyleClick() {
  addDialog({
    title: "自定义弹框位置",
    top: "60vh",
    style: { marginTop: "20px" },
    contentRenderer: () => h("p", "自定义弹框位置")
  });
}

function onOpenDelayClick() {
  addDialog({
    title: "延时打开弹框",
    openDelay: 1000,
    contentRenderer: () => h("p", "延时打开弹框")
  });
}

function onCloseDelayClick() {
  addDialog({
    title: "延时关闭弹框",
    closeDelay: 1000,
    contentRenderer: () => h("p", "延时关闭弹框")
  });
}

function onHideCloseIconClick() {
  addDialog({
    title: "隐藏关闭图标",
    showClose: false,
    contentRenderer: () => h("p", "隐藏关闭图标")
  });
}

function onBeforeCloseClick() {
  addDialog({
    title: "禁止通过键盘ESC关闭",
    closeOnPressEscape: false,
    contentRenderer: () => <p>弹框内容-禁止通过键盘ESC关闭</p>
  });
}

function onCloseOnClickModalClick() {
  addDialog({
    title: "禁止通过点击modal关闭",
    closeOnClickModal: false,
    contentRenderer: () => <p>弹框内容-禁止通过点击modal关闭</p>
  });
}

function onHideFooterClick() {
  addDialog({
    title: "隐藏底部取消、确定按钮",
    hideFooter: true,
    contentRenderer: () => <p>弹框内容-隐藏底部取消、确定按钮</p>
  });
}

function onHeaderRendererClick() {
  addDialog({
    title: "自定义头部",
    showClose: false,
    headerRenderer: ({ close, titleId, titleClass }) => (
      <div class="flex items-center justify-between">
        <h4 id={titleId} class={titleClass}>
          自定义头部
        </h4>
        <el-button type="danger" onClick={close}>
          关闭
        </el-button>
      </div>
    ),
    contentRenderer: () => <p>弹框内容-自定义头部</p>
  });
}

function onFooterRendererClick() {
  addDialog({
    title: "自定义底部",
    footerRenderer: ({ options, index }) => (
      <div class="flex justify-end">
        <el-button type="danger" onClick={() => closeDialog(options, index)}>
          关闭
        </el-button>
      </div>
    ),
    contentRenderer: () => <p>弹框内容-自定义底部</p>
  });
}

function onOpenCallBackClick() {
  addDialog({
    title: "打开后回调",
    open: ({ options, index }) => {
      message(`打开后回调: ${options.title} ${index}`);
    },
    contentRenderer: () => <p>弹框内容-打开后回调</p>
  });
}

function onCloseCallBackClick() {
  addDialog({
    title: "关闭后回调",
    closeCallBack: ({ options, index, args }) => {
      message(`关闭后回调: ${options.title} ${index} ${args.command}`);
    },
    contentRenderer: () => <p>弹框内容-关闭后回调</p>
  });
}

function onNestedDialogClick(index: number, width: string) {
  addDialog({
    title: "嵌套弹框",
    width,
    contentRenderer: () => (
      <el-button onClick={() => onNestedDialogClick(index + 1, width)}>
        打开{index + 1}级嵌套弹框
      </el-button>
    )
  });
}

function onUpdateClick() {
  let num = ref(0);
  addDialog({
    title: `更改弹框自身属性值 ${num.value}`,
    contentRenderer: () => (
      <div>
        <p>弹框内容-更改弹框自身属性值</p>
        <el-button
          onClick={() => {
            num.value++;
            updateDialog(`更改弹框自身属性值 ${num.value}`, "title");
          }}
        >
          增加
        </el-button>
      </div>
    )
  });
}

function onPopconfirmClick() {
  addDialog({
    width: "30%",
    title: "Popconfirm确认框示例",
    popconfirm: { title: "是否确认修改当前数据" },
    contentRenderer: () => <p>点击右下方确定按钮看看效果吧</p>
  });
}

function onFormOneClick() {
  addDialog({
    title: "结合Form表单（第一种方式）",
    contentRenderer: () => forms,
    width: "30%",
    props: {
      formInline: {
        user: "admin",
        region: "上海"
      }
    },
    closeCallBack: ({ options, index, args }) => {
      const { formInline } = options.props as FormProps;
      message(`表单数据: ${formInline.user} ${formInline.region}`);
    }
  });
}

const formInline = ref({
  user: "菜虚鲲",
  region: "浙江"
});
const resetFormInline = cloneDeep(formInline.value);
function onFormTwoClick() {
  addDialog({
    width: "30%",
    title: "结合Form表单（第二种方式）",
    contentRenderer: () =>
      h(forms, {
        formInline: formInline.value
      }),
    closeCallBack: () => {
      message(
        `当前表单数据为 姓名：${formInline.value.user} 城市：${formInline.value.region}`
      );
      // 重置表单数据
      formInline.value = cloneDeep(resetFormInline);
    }
  });
}

const formThreeInline = ref({
  user: "菜虚鲲",
  region: "浙江"
});
function onFormThreeClick() {
  addDialog({
    width: "30%",
    title: "结合Form表单（第三种方式）",
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: () => {
      message(
        `当前表单数据为 姓名：${formThreeInline.value.user} 城市：${formThreeInline.value.region}`
      );
    }
  });
}

// 结合Form表单（第四种方式）使用jsx语法
const formFourInline = ref({
  user: "菜虚鲲",
  region: "浙江"
});
const resetFormFourInline = cloneDeep(formFourInline.value);
function onFormFourClick() {
  addDialog({
    width: "30%",
    title: "结合Form表单（第四种方式）",
    contentRenderer: () => <forms formInline={formFourInline.value} />,
    closeCallBack: () => {
      message(
        `当前表单数据为 姓名：${formFourInline.value.user} 城市：${formFourInline.value.region}`
      );
      // 重置表单数据
      formFourInline.value = cloneDeep(resetFormFourInline);
    }
  });
}

// 结合Form表单（第五种方式）使用jsx语法
const formFiveInline = ref("hello");
function onFormFiveClick() {
  addDialog({
    width: "30%",
    title: "结合Form表单（第四种方式）",
    contentRenderer: () =>
      h(formPrimitive, {
        data: formFiveInline.value,
        "onUpdate:data": val => (formFiveInline.value = val)
      }),
    closeCallBack: () => {
      message(
        `当前表单数据为 姓名：${formFourInline.value.user} 城市：${formFourInline.value.region}`
      );
    }
  });
}

function onBeforeCancelClick() {
  addDialog({
    title: "点击底部取消按钮的回调",
    contentRenderer: () => (
      <p>弹框内容-点击底部取消按钮的回调（会暂停弹框的关闭）</p>
    ),
    beforeCancel: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      done(); // 需要关闭把注释解开即可
    }
  });
}

function onBeforeSureClick() {
  addDialog({
    title: "点击底部确定按钮的回调",
    contentRenderer: () => (
      <p>
        弹框内容-点击底部确定按钮的回调（会暂停弹框的关闭，经常用于新增、修改弹框内容后调用接口）
      </p>
    ),
    beforeSure: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // 需要关闭把注释解开即可
    }
  });
}

function onSureBtnLoading() {
  addDialog({
    sureBtnLoading: true,
    title: "点击底部确定按钮可开启按钮动画",
    contentRenderer: () => <p>弹框内容-点击底部确定按钮可开启按钮动画</p>,
    beforeSure: (done, { closeLoading }) => {
      // closeLoading() // 关闭确定按钮动画，不关闭弹框
      // done() // 关闭确定按钮动画并关闭弹框
      setTimeout(() => done(), 800);
    }
  });
}

function onTransitionClick(title, transition) {
  addDialog({
    width: "30%",
    title,
    transition,
    contentRenderer: () => <p>{JSON.stringify(transition)}</p>
  });
}
</script>
<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          二次封装 Element Plus 的
          <el-link
            href="https://element-plus.org/zh-CN/component/dialog.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Dialog
          </el-link>
          ，采用函数式调用弹框组件（更多操作实例请参考
          <span
            class="cursor-pointer text-primary"
            @click="router.push({ name: 'SystemDept' })"
          >
            系统管理页面
          </span>
          ）
        </span>
      </div>
      <el-link
        href="https://github.com/pure-admin/vue-pure-admin/tree/main/src/views/components/dialog"
        target="_blank"
      >
        代码位置 src/views/components/dialog
      </el-link>
    </template>
    <el-space wrap>
      <el-button @click="onBaseClick">基础弹框</el-button>
      <el-button @click="onDraggableClick">可拖拽弹框</el-button>
      <el-button @click="onFullscreenClick">弹框内容-全屏</el-button>
      <el-button @click="onFullscreenIconClick">全屏弹框事件</el-button>
      <el-button @click="onNoMaskClick">无遮罩弹框</el-button>
      <el-button @click="onStyleClick">自定义弹框位置</el-button>
      <el-button @click="onOpenDelayClick">延时打开弹框</el-button>
      <el-button @click="onCloseDelayClick">延时关闭弹框</el-button>
      <el-button @click="onHideCloseIconClick">隐藏关闭图标</el-button>
      <el-button @click="onBeforeCloseClick">禁止通过键盘ESC关闭</el-button>
      <el-button @click="onCloseOnClickModalClick"
        >禁止通过点击modal关闭</el-button
      >
      <el-button @click="onHideFooterClick">隐藏底部取消、确定按钮</el-button>
      <el-button @click="onHeaderRendererClick"> 自定义头部 </el-button>
      <el-button @click="onFooterRendererClick"> 自定义底部 </el-button>
      <el-button @click="onOpenCallBackClick"> 打开后回调 </el-button>
      <el-button @click="onCloseCallBackClick"> 关闭后回调 </el-button>
      <el-button @click="onNestedDialogClick(1, '500px')"> 嵌套弹框 </el-button>
      <el-button @click="onUpdateClick"> 更改弹框自身属性值 </el-button>
      <el-button @click="onPopconfirmClick"> Popconfirm确认框示例 </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onFormOneClick">
        结合Form表单（第一种方式）
      </el-button>
      <el-button @click="onFormTwoClick">
        结合Form表单（第二种方式）
      </el-button>
      <el-button @click="onFormThreeClick">
        结合Form表单（第三种方式）
      </el-button>
      <el-button @click="onFormFourClick">
        结合Form表单（第四种方式）
      </el-button>
      <el-button @click="onFormFiveClick">
        结合Form表单（第五种方式）
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onBeforeCancelClick">
        点击底部取消按钮前的回调
      </el-button>
      <el-button @click="onBeforeSureClick">
        点击底部确定按钮前的回调
      </el-button>
      <el-button @click="onSureBtnLoading">
        点击底部确定按钮前的回调动画
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button
        @click="onTransitionClick('淡入淡出动画（默认）', 'dialog-fade')"
      >
        淡入淡出动画（默认）
      </el-button>
      <el-button @click="onTransitionClick('缩放动画', 'dialog-scale')">
        缩放动画
      </el-button>
    </el-space>
  </el-card>
</template>
<style>
/* Scale Animation */
.dialog-scale-enter-active,
.dialog-scale-leave-active,
.dialog-scale-enter-active .el-dialog,
.dialog-scale-leave-active .el-dialog {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dialog-scale-enter-from,
.dialog-scale-leave-to {
  opacity: 0;
}

.dialog-scale-enter-from .el-dialog,
.dialog-scale-leave-to .el-dialog {
  opacity: 0;
  transform: scale(0.5);
}
</style>

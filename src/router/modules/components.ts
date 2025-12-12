import { $t } from "@/plugins/i18n";
import { components } from "@/router/enums";

export default {
  path: "/components",
  redirect: "/components/dialog",
  meta: {
    icon: "ep/menu",
    title: $t("menus.pureComponents"),
    rank: components
  },
  children: [
    {
      path: "/components/dialog",
      name: "DialogPage",
      component: () => import("@/views/components/dialog/index.vue"),
      meta: {
        title: $t("menus.pureDialog")
      }
    },
    {
      path: "/components/drawer",
      name: "DrawerPage",
      component: () => import("@/views/components/drawer/index.vue"),
      meta: {
        title: $t("menus.pureDrawer")
      }
    },
    {
      path: "/components/message",
      name: "Message",
      component: () => import("@/views/components/message.vue"),
      meta: {
        title: $t("menus.pureMessage")
      }
    }
  ]
} satisfies RouteConfigsTable;

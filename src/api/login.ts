import { http } from "@/utils/http";

/** 获取系统管理-用户管理列表 */
export const getLogin = (data?: object) => {
  return http.request<any>("post", "/login", { data });
};

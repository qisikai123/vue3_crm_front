import { http } from "@/utils/http";

type Result = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
};

/** 卡片列表 */
export const getFileList = (data?: object) => {
  return http.request<Result>("post", "/query-image", { data });
};

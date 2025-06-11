import { defineStore } from 'pinia'
import { store } from '../utils'

export const useUserStore = defineStore('user', {
  state: () => ({
    verifyCode: '', // 验证码
  }),
  actions: {
    SET_VERIFY_CODE(code: string) {
      this.verifyCode = code
    },
    GET_VERIFY_CODE() {
      return this.verifyCode
    },
  },
})

export const useUserStoreHook = () => {
  return useUserStore(store)
}

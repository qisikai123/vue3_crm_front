<script lang="ts" setup>
import { onMounted, ref, defineOptions, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Motion from "./utils/motion";
import TypeIt from "@/components/ReTypeit/index";
import { useNav } from "@/layout/hooks/useNav";
import { useUserStoreHook } from "@/store/modules/user";
import { ReImageVerify } from "@/components/ReImageVerify/index";
import { useRouter } from "vue-router";
import { initRouter, getTopMenu } from "@/router/utils";
import { message } from "@/utils/message";
import { ReI18nToggle } from "@/components/ReI18nToggle/index";

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { t } = useI18n();
const router = useRouter();

const options = {
  strings: [t("global.author")],
  cursor: false,
  speed: 100
};

defineOptions({
  name: "Login"
});

let bulletsFlag = ref<number>(1);
let textGroupStyle = ref<string>("translateY(0)");
let mainStyle = ref<Boolean>(false);
let loginForm = ref<{
  username: string;
  password: string;
  verifyCode: string;
}>({
  username: "admin",
  password: "admin123",
  verifyCode: ""
});
let registerForm = ref<{ username: string; email: string; password: string }>({
  username: "",
  email: "",
  password: ""
});
const imgCode = ref("");

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFYCODE(value);
});

const bulletsClick = (data: number): void => {
  textGroupStyle.value = `translateY(${-(data - 1) * 2.2}rem)`;
  bulletsFlag.value = data;
};

const loading = ref<boolean>(false);

const handleLogin = () => {
  // 表单验证
  if (!loginForm.value.username) {
    ElMessage.error(t("login.usernameEmpty"));
    return;
  }
  if (!loginForm.value.password) {
    ElMessage.error(t("login.passwordEmpty"));
    return;
  }
  if (!loginForm.value.verifyCode) {
    ElMessage.error(t("login.verifyCodeEmpty"));
    return;
  }
  if (
    loginForm.value.verifyCode.toLowerCase() !== imgCode.value.toLowerCase()
  ) {
    ElMessage.error(t("login.verifyCodeError"));
    return;
  }
  loading.value = true;
  useUserStoreHook()
    .loginByUsername(loginForm.value)
    .then((res: any) => {
      return initRouter().then(() => {
        router.push(getTopMenu(true).path).then(() => {
          message(t("login.loginSuccess"), { type: "success" });
        });
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleRegister = () => {
  // 表单验证
  if (!registerForm.value.username) {
    ElMessage.error(t("login.usernameEmpty"));
    return;
  }
  if (!registerForm.value.email) {
    ElMessage.error(t("login.emailEmpty"));
    return;
  }
  if (!registerForm.value.password) {
    ElMessage.error(t("login.passwordEmpty"));
    return;
  }
};
</script>
<template>
  <div class="login-box">
    <main :class="mainStyle ? 'sign-up-mode' : ''">
      <div class="flex-c absolute right-5 top-3">
        <!-- 主题 -->
        <el-switch
          v-model="dataTheme"
          inline-prompt
          :active-icon="dayIcon"
          :inactive-icon="darkIcon"
          @change="dataThemeChange"
        />
        <ReI18nToggle />
      </div>
      <div class="box bg-gray-50 dark:bg-gray-800">
        <div class="inner-box">
          <div class="forms-wrap">
            <form
              action="index.html"
              autocomplete="off"
              class="sign-in-form"
              @submit.prevent="handleLogin"
            >
              <div class="flex justify-start items-center">
                <img src="/favicon.ico" alt="easyclass" />
                <TypeIt :options="options" />
              </div>

              <div class="heading">
                <h6>{{ t("login.noRegister") }}</h6>
                <a
                  href="javascript:void(0)"
                  @click="mainStyle = true"
                  class="toggle"
                  >{{ t("login.register") }}</a
                >
              </div>

              <div class="actual-form">
                <Motion :delay="100">
                  <div class="input-wrap">
                    <input
                      v-model="loginForm.username"
                      type="text"
                      minlength="4"
                      class="input-field"
                      :class="loginForm.username ? 'active' : ''"
                      autocomplete="off"
                      required
                    />

                    <label>{{ t("login.username") }}</label>
                  </div>
                </Motion>

                <Motion :delay="200">
                  <div class="input-wrap">
                    <input
                      v-model="loginForm.password"
                      type="password"
                      minlength="4"
                      class="input-field"
                      :class="loginForm.password ? 'active' : ''"
                      autocomplete="off"
                      required
                    />
                    <label>{{ t("login.password") }}</label>
                  </div>
                </Motion>

                <Motion :delay="300">
                  <div class="input-wrap2">
                    <input
                      v-model="loginForm.verifyCode"
                      type="text"
                      class="input-field2"
                      :class="loginForm.verifyCode ? 'active' : ''"
                    />
                    <ReImageVerify v-model:code="imgCode" />
                  </div>
                </Motion>

                <Motion :delay="400">
                  <input
                    type="submit"
                    v-loading="loading"
                    :value="t('login.login')"
                    class="sign-btn"
                  />
                </Motion>

                <p class="text">
                  {{ t("login.forgetPassword") }}
                  <a href="javascript:void(0)">{{ t("login.getHelp") }}</a>
                </p>
              </div>
            </form>

            <!-- 注册 -->
            <form
              action="index.html"
              autocomplete="off"
              class="sign-up-form"
              @submit.prevent="handleRegister"
            >
              <div class="flex justify-start items-center">
                <img src="/favicon.ico" :alt="t('global.author')" />
                <h4>{{ t("global.author") }}</h4>
              </div>

              <div class="heading">
                <h2>{{ t("login.startNow") }}</h2>
                <h6>{{ t("login.alreadyHaveAccount") }}</h6>
                <a
                  href="javascript:void(0)"
                  @click="mainStyle = false"
                  class="toggle"
                  >{{ t("login.login") }}</a
                >
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    v-model="registerForm.username"
                    type="text"
                    minlength="4"
                    class="input-field"
                    :class="registerForm.username ? 'active' : ''"
                    autocomplete="off"
                    required
                  />
                  <label>{{ t("login.username") }}</label>
                </div>

                <div class="input-wrap">
                  <input
                    v-model="registerForm.email"
                    type="email"
                    class="input-field"
                    :class="registerForm.email ? 'active' : ''"
                    autocomplete="off"
                    required
                  />
                  <label>{{ t("login.email") }}</label>
                </div>

                <div class="input-wrap">
                  <input
                    v-model="registerForm.password"
                    type="password"
                    minlength="4"
                    class="input-field"
                    :class="registerForm.password ? 'active' : ''"
                    autocomplete="off"
                    required
                  />
                  <label>{{ t("login.password") }}</label>
                </div>

                <input
                  type="submit"
                  :value="t('login.register')"
                  class="sign-btn"
                />

                <p class="text">
                  {{ t("login.throughRegister") }}
                  <a href="javascript:void(0)">{{ t("login.serviceTerms") }}</a>
                  {{ t("login.and") }}
                  <a href="javascript:void(0)">{{
                    t("login.privacyPolicy")
                  }}</a>
                </p>
              </div>
            </form>
          </div>

          <div class="carousel bg-[#f0e3dd] dark:bg-gray-700">
            <div class="images-wrapper">
              <!-- <img src="../../assets/vue.svg" class="image img-1 show" alt="" />
              <img src="../../assets/vue.svg" class="image img-2" alt="" />
              <img src="../../assets/vue.svg" class="image img-3" alt="" /> -->
            </div>
            <div class="text-slider">
              <div class="text-wrap">
                <div class="text-group" :style="{ transform: textGroupStyle }">
                  <h2>{{ t("login.worldBeautiful") }}</h2>
                  <h2>{{ t("login.hopeYouAlwaysLove") }}</h2>
                  <h2>{{ t("login.rememberSmile") }}</h2>
                </div>
              </div>

              <div class="bullets">
                <span
                  v-for="(item, index) in 3"
                  :key="index"
                  :class="bulletsFlag == item ? 'active' : ''"
                  :data-value="item"
                  @click="bulletsClick(item)"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  main {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    position: relative;
    width: 100%;
    max-width: 1020px;
    height: 640px;
    border-radius: 3.3rem;
    box-shadow: 0 0px 12px rgba(0, 0, 0, 0.27);
  }

  .inner-box {
    position: absolute;
    width: calc(100% - 4.1rem);
    height: calc(100% - 4.1rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .forms-wrap {
    position: absolute;
    height: 100%;
    width: 45%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    transition: 0.8s ease-in-out;
  }

  form {
    max-width: 260px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    transition: opacity 0.02s 0.4s;
  }

  form.sign-up-form {
    opacity: 0;
    pointer-events: none;
  }

  .logo img {
    width: 27px;
    margin-right: 0.3rem;
  }

  .logo h4 {
    font-size: 1.1rem;
    margin-top: -9px;
    letter-spacing: -0.5px;
  }

  .heading h2 {
    font-size: 2.1rem;
    font-weight: 600;
  }

  .heading h6 {
    font-weight: 400;
    font-size: 0.75rem;
    display: inline;
  }

  .toggle {
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 500;
    transition: 0.3s;
  }

  .toggle:hover {
    color: #8371fd;
  }

  .input-wrap {
    position: relative;
    height: 37px;
    margin-bottom: 2rem;
  }

  .input-wrap2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #bbb;
    flex: 1 1 0;
  }

  .input-field2 {
    background: none;
    border: none;
    outline: none;
    // border-bottom: 1px solid #bbb;
    padding: 0;
    font-size: 0.95rem;
    transition: 0.4s;
    width: 50%;
  }

  .input-field {
    position: absolute;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #bbb;
    padding: 0;
    font-size: 0.95rem;
    transition: 0.4s;
  }

  label {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.95rem;
    color: #bbb;
    pointer-events: none;
    transition: 0.4s;
  }

  .input-field.active {
    border-bottom-color: #151111;
  }

  .input-field.active + label {
    font-size: 0.75rem;
    top: -2px;
  }

  .sign-btn {
    display: inline-block;
    width: 100%;
    height: 43px;
    border: none;
    cursor: pointer;
    border-radius: 0.8rem;
    font-size: 0.8rem;
    margin-bottom: 2rem;
    transition: 0.3s;
  }

  .sign-btn:hover {
    background-color: #8371fd;
  }

  .text {
    color: #bbb;
    font-size: 0.7rem;
  }

  .text a {
    color: #bbb;
    transition: 0.3s;
  }

  .text a:hover {
    color: #8371fd;
  }

  main.sign-up-mode form.sign-in-form {
    opacity: 0;
    pointer-events: none;
  }

  main.sign-up-mode form.sign-up-form {
    opacity: 1;
    pointer-events: all;
  }

  main.sign-up-mode .forms-wrap {
    left: 55%;
  }

  main.sign-up-mode .carousel {
    left: 0%;
  }

  .carousel {
    position: absolute;
    height: 100%;
    width: 55%;
    left: 45%;
    top: 0;
    // background-color: #ffe0d2;
    border-radius: 2rem;
    display: grid;
    grid-template-rows: auto 1fr;
    padding-bottom: 2rem;
    overflow: hidden;
    transition: 0.8s ease-in-out;
  }

  .images-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .image {
    width: 100%;
    grid-column: 1/2;
    grid-row: 1/2;
    opacity: 0;
    transition:
      opacity 0.3s,
      transform 0.5s;
  }

  .img-1 {
    transform: translate(0, -50px);
  }

  .img-2 {
    transform: scale(0.4, 0.5);
  }

  .img-3 {
    transform: scale(0.3) rotate(-20deg);
  }

  .image.show {
    opacity: 1;
    transform: none;
  }

  .text-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .text-wrap {
    max-height: 2.2rem;
    overflow: hidden;
    margin-bottom: 2.5rem;
  }

  .text-group {
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(0);
    transition: 0.5s;
  }

  .text-group h2 {
    line-height: 2.2rem;
    font-weight: 600;
    font-size: 1.6rem;
  }

  .bullets {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bullets span {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #aaa;
    margin: 0 0.25rem;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
  }

  .bullets span.active {
    width: 1.1rem;
    background-color: #151111;
    border-radius: 1rem;
  }
}
</style>

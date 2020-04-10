<template>
  <b-container class="login_page flex column">
    <a href="/" class="logo" style="cursor: pointer">
      <img src="../assets/logo.png" />
    </a>
    <b-card class="login_box">
      <div>
        <h2 class="text-center">登录</h2>
        <b-form ref="loginForm" :model="data">
          <b-form-group id="fieldset-phone" prop="phone" label="手机号" label-for="input-horizontal">
            <b-form-input
              v-model="data.phone"
              id="input-phone"
              @keyup.native.enter="submitForm()"
              placeholder="请输入手机号"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-captcha" label-for="nocaptcha">
            <captcha id="nocaptcha" @cback="captchaCallback" v-show="data.phone.length===11"></captcha>
          </b-form-group>
          <b-form-group
            id="fieldset-horizontal"
            label-for="input-code"
            prop="code"
            label="短信验证码"
            v-show="showSmsBtn && data.phone.length===11"
          >
            <b-input-group>
              <b-form-input
                v-model="data.code"
                id="input-code"
                @keyup.native.enter="submitForm()"
                placeholder="请输入您收到的短信验证码"
              ></b-form-input>
              <b-input-group-append>
                <b-button v-show="codeBtnShow" slot="append" @click="getValidateCode">获取短信验证码</b-button>
                <b-button v-show="!codeBtnShow" slot="append">
                  <span>{{timer}}</span>秒后重新获取
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-button
            round
            @click="submitForm()"
            :disabled="!(data.phone && data.code) || loading"
            style="width: 100%"
          >
            <b-spinner small type="grow" v-show="loading" variant="info" class="mb-1 mr-1"></b-spinner>立即登录
          </b-button>
        </b-form>
      </div>
    </b-card>
  </b-container>
</template>
<script>
import captcha from "@/components/captcha";
import { getValidateCode, checkCaptcha } from "@/api";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loading: false,
      codeBtnShow: true,
      showSmsBtn: false,
      timer: 60,
      data: {
        phone: "",
        code: null
      }
    };
  },
  components: {
    captcha
  },
  created() {
    this.userLogout();
  },
  methods: {
    ...mapMutations(["USERLOGOUT"]),
    ...mapActions(["LOGIN_ACTION"]),
    async submitForm() {
      try {
        try {
          this.loading = true;
          await this.LOGIN_ACTION(this.data);
          this.$swal("登录成功！");
          this.$router.push({ path: "home" });
        } catch (e) {
          this.$throw(e, this);
        } finally {
          this.loading = false;
        }
      } catch (e) {
        this.$throw(e, this);
      }
    },
    async getValidateCode() {
      await getValidateCode(this.data);
      this.codeBtnShow = false;
      var auth_timer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.codeBtnShow = true;
          clearInterval(auth_timer);
        }
      }, 1000);
    },
    userLogout() {
      try {
        this.USERLOGOUT();
      } catch (e) {
        this.$swal("登出失败！" + e.message);
        this.$throw(e, this);
      }
    },
    async captchaCallback(callbackParam) {
      callbackParam.phone = this.data.phone;
      await checkCaptcha(callbackParam);
      this.showSmsBtn = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.login_page {
  height: 100%;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  img {
    height: 140px;
  }
  .login_box {
    width: 600px;
  }
}
@media screen and (max-width: 640px) {
  .login_page {
    padding-top: 40px;
  }
}
</style>

<template>
  <div class="captcha" id="captcha">
    <nocaptcha :appkey="appKey" width="250px" :scene="'nc_login'" @callback="callback"></nocaptcha>
  </div>
</template>

<script>
import { nocaptcha } from "vue-nocaptcha";
export default {
  name: "captcha",
  data() {
    return {
      appKey: "FFFF0N00000000008C96",
      scene: "nc_login"
    };
  },
  mounted() {},
  components: { nocaptcha },
  methods: {
    callback: function(data) {
      let param = {
        token:data.token,
        sessionId: data.csessionid,
        signature: data.sig,
        appKey: this.appKey,
        scene: this.scene
      };
      this.$emit("cback", param);
    }
  }
};
</script>

<style>
</style>
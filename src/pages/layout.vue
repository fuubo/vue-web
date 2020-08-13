<template>
  <div style="height: 100%">
    <header class="main-header">
      <div class="container">
        <div class="header-content">
          <a href="/index.html">
            <img src="../assets/img/site-identity.png" alt="site identity" />
          </a>
          <nav class="site-nav">
            <b-dropdown
              v-if="islogin && userInfo"
              id="dropdown-1"
              :text="`你好 ${userInfo.realName}`"
              variant="outline-light"
            >
              <b-dropdown-item class="bg-white">个人中心</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="userLogout">注销</b-dropdown-item>
            </b-dropdown>
            <a :href="`/login`" v-else class="btn btn-outlined">登录｜注册</a>
          </nav>
        </div>
      </div>
    </header>
    <router-view />
    <footer class="main-footer">
      <b-container>
        <div class="col-md-5">
          <div class="widget widget_links">
            <h5 class="widget-title">Top Locations</h5>
            <ul>
              <li>
                <a href="#">Lorem impsum dolor</a>
              </li>
              <li>
                <a href="#">Sit amet consectetur</a>
              </li>
              <li>
                <a href="#">Adipisicing elit</a>
              </li>
              <li>
                <a href="#">Eiusmod tempor</a>
              </li>
              <li>
                <a href="#">incididunt ut labore</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-5">
          <div class="widget widget_links">
            <h5 class="widget-title">Featured Campaign</h5>
            <ul>
              <li>
                <a href="#">Lorem impsum dolor</a>
              </li>
              <li>
                <a href="#">Sit amet consectetur</a>
              </li>
              <li>
                <a href="#">Adipisicing elit</a>
              </li>
              <li>
                <a href="#">Eiusmod tempor</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-9">
          <div class="widget widget_social">
            <h5 class="widget-title">Subscribe to our newsletter</h5>
            <form class="subscribe-form">
              <div class="input-line">
                <input type="text" name="subscribe-email" value placeholder="Your email address" />
              </div>
              <button
                type="button"
                name="subscribe-submit"
                class="btn btn-special no-icon"
              >Subscribe</button>
            </form>

            <ul class="clean-list social-block">
              <li>
                <a href="#">
                  <i class="icon-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon-google-plus"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-5">
          <div class="widget widget_links">
            <h5 class="widget-title">Contact us</h5>
            <ul>
              <li>
                <a href="#">Lorem impsum dolor</a>
              </li>
              <li>
                <a href="#">Sit amet consectetur</a>
              </li>
              <li>
                <a href="#">Adipisicing elit</a>
              </li>
              <li>
                <a href="#">Eiusmod tempor</a>
              </li>
              <li>More Questions</li>
            </ul>
          </div>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { LOGINAUTHTOKEN } from "@/utils/constants";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "layout",
  data() {
    return {
      activeIndex: null,
      isCollapse: false,
    };
  },
  computed: {
    ...mapState(["islogin", "userInfo", "menu"]),
  },
  async created() {
    this.activeIndex = "/" + this.$router.currentRoute.fullPath.split("/")[1];
    if (this.activeIndex !== "/login") {
      if (localStorage.getItem(LOGINAUTHTOKEN)) {
        try {
          await this.GET_USER_INFO();
          await this.GET_DISTRICTS();
          await this.GET_SYSTEM_CLUBS();
          await this.GET_ACTIVITY_CATEGORIES();
        } catch (e) {
          this.$throw(e, this);
        }
      }
    }
  },
  watch: {
    $route: "changeIndex",
  },
  methods: {
    ...mapMutations(["USERLOGOUT"]),
    ...mapActions([
      "GET_USER_INFO",
      "GET_DISTRICTS",
      "GET_SYSTEM_CLUBS",
      "GET_ACTIVITY_CATEGORIES",
    ]),
    changeIndex() {
      this.activeIndex = "/" + this.$router.currentRoute.fullPath.split("/")[1];
    },
    changeSelect(to) {
      if (this.activeIndex !== to) {
        this.activeIndex = this.$router.currentRoute.fullPath;
        this.$router.push(to);
      }
    },
    userLogout() {
      try {
        this.USERLOGOUT();
        this.$router.replace("/login");
      } catch (e) {
        this.$swal("登出失败！" + e.message);
        this.$throw(e, this);
      }
    },
    goto(to) {
      this.$router.push(to);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/screen.css";
.el-container {
  display: flex;
  flex-direction: column !important;
}
.wHeader {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  z-index: 9;
  border-bottom: 1px solid #eee;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  padding: 0 0 20px 0px;
}
.pageHeader {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.el-main {
  padding: 0 !important;
}
.fixHeader {
  position: sticky;
  top: 0;
  background: white;
  z-index: 9;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 10px;
  padding: 0 20px 10px 20px;
}
</style>

<template>
  <div class="home">
    <!-- Main Content -->
    <div class="content-box">
      <!-- Hero Section -->
      <section class="section section-hero">
        <div class="hero-box">
          <div class="container">
            <div class="hero-text align-center">
              <h1>探索大自然的美</h1>
            </div>
            <form class="destinations-form">
              <div class="input-line">
                <input
                  type="text"
                  name="destination"
                  v-model="keyword"
                  class="form-input check-value"
                  placeholder="试试搜索想要去的城市？"
                />
                <button
                  type="button"
                  name="destination-submit"
                  class="form-submit btn btn-special"
                  @click="search"
                >搜索活动</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Statistics Box -->
        <div class="container">
          <div class="statistics-box">
            <div class="statistics-item">
              <span class="value">2,300</span>
              <p class="title">目的地</p>
            </div>

            <div class="statistics-item">
              <span class="value">1,000</span>
              <p class="title">城市</p>
            </div>

            <div class="statistics-item">
              <span class="value">35,000</span>
              <p class="title">团队</p>
            </div>

            <div class="statistics-item">
              <span class="value">50,000</span>
              <p class="title">笔记</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Destinations Section -->
      <section class="section section-destination" v-if="list">
        <!-- Title -->
        <div class="section-title">
          <div class="container">
            <h2 class="title">最新户外活动推荐</h2>
            <p class="sub-title">{{new Date().getFullYear()}}年{{new Date().getMonth()+1}}月</p>
          </div>
        </div>

        <!-- Content -->
        <b-container>
          <div
            v-for="(item,index) in list"
            :key="index"
            :class="(index==0?'col-md-16':'col-md-8 col-sm-12')+' col-xs-24'"
          >
            <div class="destination-box">
              <div class="box-cover">
                <a :href="`/activityInfo/${item.id}`">
                  <img :src="item.picture" style="height:330px;" alt="destination image" />
                </a>
              </div>
              <span class="boats-qty icon-location">{{item.province}}</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="city">{{item.title}}</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="align-center" v-if="total > 5">
            <b-button variant="outline-dark" @click="$router.push({ path:'/activityList'  })">
              <span class="text-small">查看更多</span>
            </b-button>
          </div>
        </b-container>
      </section>

      <!-- Boats Section -->
      <section class="section section-boats" v-show="false">
        <!-- Title -->
        <div class="section-title">
          <div class="container">
            <h2 class="title">极限运动</h2>
            <p class="sub-title">潜水、滑雪、攀岩、滑翔伞</p>
          </div>
        </div>

        <!-- Content -->
        <b-container>
          <div class="col-sm-12 col-xs-24">
            <div class="boat-box">
              <div class="box-cover">
                <img src="../assets/img/boat-1.jpg" alt="destination image" />
              </div>

              <span class="boat-price">€580 / day</span>

              <div class="box-details">
                <div class="box-meta">
                  <h4 class="boat-name">Delphia 47</h4>
                  <ul class="clean-list boat-meta">
                    <li class="location">Gdansk, Poland</li>
                    <li class="berths">8 Berths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="align-center">
            <b-button variant="outline-dark">
              <span class="text-small">查看更多</span>
            </b-button>
          </div>
        </b-container>
      </section>

      <!-- Parallax Box -->
      <div class="parallax-box">
        <div class="container">
          <div class="text align-center">
            <h1>与我们合作</h1>
            <p>我们渴望每位同样专注于户外运动的供应商加盟</p>
            <a href="#" v-b-modal.telephone class="btn btn-special no-icon size-2x">联系我们</a>
            <b-modal id="telephone" title="联系电话">
              <p class="my-4 text-center">
                <a
                  href="tel:18211026907"
                  v-b-tooltip
                  title="点击立即拨打"
                  style="font-size:25px"
                >+86 182 1102 6907</a>
              </p>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivityList } from "@/api";
export default {
  name: "Home",
  data() {
    return {
      keyword: null,
      list: null,
      total: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let param = {
        recommendFlag: true
      };
      let result = await getActivityList(param);
      this.list = result.list;
      this.total = result.pagination.total;
    },
    search(){
      let path = '/activityList';
      if(this.keyword){
        path = path + '/' + this.keyword;
      }
      this.$router.push({
        path:path
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

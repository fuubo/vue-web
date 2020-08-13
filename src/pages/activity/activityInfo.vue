<template>
  <div class="activityInfo" v-if="id">
    <b-container class="bv-example-row" style="padding-top: 80px;padding-bottom: 50px;">
      <b-row>
        <b-col cols="12" lg="6" class="pt-3">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="400"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide v-for="item in carouselPictures" :key="item.url" :img-src="item.url"></b-carousel-slide>
          </b-carousel>
        </b-col>
        <b-col cols="12" v-if="data" lg="6" class="pt-3">
          <h1>{{data.title}}</h1>
          <div class="ml-4" style="font-style:italic;text-decoration:underline">
            <p><b-icon icon="cursor-fill"></b-icon> 集合城市：<strong>{{data.province}}{{data.city}}</strong></p>
            <p><b-icon icon="flag-fill"></b-icon> 活动地点：<strong>{{data.location}}</strong></p>
            <p><b-icon icon="calendar-fill"></b-icon> 活动时间：<strong>{{data.startDate|dateFormat}} ~ {{data.endDate|dateFormat}}</strong></p>
            <p><b-icon icon="people-fill"></b-icon> 俱乐部名：<strong>{{clubs && clubs[data.clubId]}}</strong></p>
            <p><b-icon icon="grid-fill"></b-icon> 活动类型：<strong>{{activityCategories && activityCategories[data.categoryId]}}</strong></p>  
          </div>
          <b-button size="lg" v-b-modal.telephone variant="outline-dark" class="ml-3">报名咨询</b-button>
          <b-modal id="telephone" title="报名电话">
            <p class="my-4 text-center">
              <a href="tel:18211026907" v-b-tooltip title="点击立即拨打" style="font-size:25px">+86 182 1102 6907</a>
            </p>
          </b-modal>
        </b-col>
      </b-row>
      <b-row v-if="data" class="mt-3">
        <b-tabs content-class="mt-3 pl-3 pr-3">
          <b-tab v-if="data.contents.destinationDetail" title="目的地介绍" active>
            <p v-html="data.contents.destinationDetail.contentText"></p>
          </b-tab>
          <b-tab v-if="data.contents.journeyDetail" title="行程介绍">
            <p v-html="data.contents.journeyDetail.contentText"></p>
          </b-tab>
          <b-tab v-if="data.contents.activityReference" title="活动参考数据">
            <p v-html="data.contents.activityReference.contentText"></p>
          </b-tab>
          <b-tab v-if="data.contents.necessaryGear" title="必备装备">
            <p v-html="data.contents.necessaryGear.contentText"></p>
          </b-tab>
          <b-tab v-if="data.contents.costDetail" title="费用介绍">
            <p v-html="data.contents.costDetail.contentText"></p>
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { getActivityInfo } from "@/api";
import { mapState } from "vuex";
export default {
  name: "activityInfo",
  computed: {
    ...mapState(["activityCategories", "clubs"]),
  },
  data() {
    return {
      id: null,
      data: null,
      slide: 0,
      sliding: null,
      carouselPictures: [],
    };
  },
  created() {
    this.changeId();
    this.getData(this.id);
  },
  methods: {
    async getData(id) {
      let result = await getActivityInfo(id);
      this.data = result;
      this.carouselPictures = [{ url: result.picture }];
    },
    changeId() {
      this.id = this.$route.params.id;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

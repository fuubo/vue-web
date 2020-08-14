<template>
  <div class="activityList">
    <section class="bv-example-row container" style="padding-top: 80px;">
      <div class="destinations-form mt-3">
        <div class="input-line">
          <input
            type="text"
            name="keyword"
            v-model="keyword"
            class="form-input check-value border"
            placeholder="试试搜索想要去的城市？"
          />
          <button
            type="button"
            name="destination-submit"
            class="form-submit btn btn-special"
            @click="search"
          >搜索活动</button>
        </div>
      </div>
    </section>
    <b-container class="mb-3">
      <b-card
        v-for="(item,index) in list"
        :key="index"
        class="mt-3"
        :img-src="item.picture"
        img-left
        img-height="150px"
        img-width="200px"
      >
        <b-card-title
          class="mb-2"
        ><u><a href="javascript:void(0);" @click="$router.push({path:`/activityInfo/${item.id}`})">{{item.title}}</a></u></b-card-title>
        <b-card-sub-title class="mb-2">{{item.province}}-{{item.city}}-{{item.location}}</b-card-sub-title>
        <b-card-text>
          <b-icon icon="calendar-fill"></b-icon>
          {{item.startDate|dateFormat}} ~ {{item.endDate|dateFormat}}
        </b-card-text>
        <b-card-text class="text-right">
          <b-badge pill variant="info">{{clubs[item.clubId]}}</b-badge>
        </b-card-text>
      </b-card>
      <div
        class="align-center mt-4"
        v-if="pagination && pagination.total > pagination.current * pagination.pageSize"
      >
        <b-button variant="outline-dark">
          <span class="text-small" @click="showMore">查看更多</span>
        </b-button>
      </div>
    </b-container>
  </div>
</template>
<script>
import { getActivityList } from "@/api";
import { mapState } from "vuex";
export default {
  name: "activityList",
  computed: {
    ...mapState(["activityCategories", "clubs"]),
  },
  data() {
    return {
      id: null,
      list: null,
      keyword: null,
      pagination: null,
    };
  },
  created() {
    this.keyword = this.$route.params.keyword;
    this.search();
  },
  methods: {
    async search() {
      await this.getData(this.keyword);
    },
    async getData(keyword) {
      let param = {
        keyword: keyword,
      };
      this.getAndRenderData(param);
    },
    showMore() {
      let param = {
        pageSize: this.pagination.pageSize + 10,
        keyword: this.keyword,
      };
      this.getAndRenderData(param);
    },
    async getAndRenderData(param) {
      let result = await getActivityList(param);
      this.list = result.list;
      this.pagination = result.pagination;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

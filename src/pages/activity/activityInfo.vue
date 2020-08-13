<template>
  <div class="activityInfo">
    <b-container class="bv-example-row" style="padding: 120px 0;">
      <b-row>
        <b-col>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide v-for="item in carouselPictures" :key="item.url" :img-src="item.url"></b-carousel-slide>
          </b-carousel>
        </b-col>
        <b-col>2 of 3</b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { getActivityInfo } from "@/api";
export default {
  name: "activityInfo",
  data() {
    return {
      id: null,
      data: null,
      slide: 0,
      sliding: null,
      carouselPictures: [
        { url: "https://picsum.photos/1024/480/?image=58" },
        { url: "https://picsum.photos/1024/480/?image=58" },
        { url: "https://picsum.photos/1024/480/?image=58" },
      ],
    };
  },
  created() {
    this.changeId();
    this.getData(this.id);
  },
  methods: {
    onSlideStart(slide) {
      console.log(slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log(slide);
      this.sliding = false;
    },
    getData(id) {
      this.data = getActivityInfo(id);
    },
    changeId() {
      this.id = this.$route.params.id;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

<template>
  <div id="app"><router-view /></div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: null,
      isCollapse: true
    };
  },
};
</script>

<style lang="scss">
</style>

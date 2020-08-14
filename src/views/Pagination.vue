<template>
  <div class="pagination">
		<router-view></router-view>
    <!-- <page-by-count-total></page-by-count-total>
    <page-by-group-count></page-by-group-count> -->
  </div>
</template>

<script>
// import PageByCountTotal from "./PageByCountTotal";
// import PageByGroupCount from "./PageByGroupCount";
export default {
  name: "pagination",
  components: {
    // PageByCountTotal,
    // PageByGroupCount,
  },
};
</script>

<style lang="scss" scoped>
/deep/.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  div {
    margin: 0 10px;
  }
}
</style>

<template>
  <div class="home">
    <wavesurfer></wavesurfer>
    <page-by-count-total></page-by-count-total>
    <page-by-group-count></page-by-group-count>
  </div>
</template>

<script>
// @ is an alias to /src
import Wavesurfer from "@/views/Wavesurfer.vue";
import PageByCountTotal from "./PageByCountTotal";
import PageByGroupCount from "./PageByGroupCount";

export default {
  name: "Home",
  components: {
    Wavesurfer,
    PageByCountTotal,
    PageByGroupCount,
  },
  created() {
    const array = [1, 2, 3, 4, 5, 6];
    array.map((item) => {
      // console.log(item);
    });
  },
  computed: {
    // groupCount() {
    //   //一组多少页
    //   return Math.ceil(this.groupCount / this.value);
    // },
    // pageTotal() {
    //   //总页数
    //   return this.groupCount * (this.totalNum / this.groupCount);
    // },
    // pageTotal1() {
    //   // 总页数
    //   return Math.ceil(this.totalNum / this.value1);
    // },
    // startPage() {
    //   //每组起始页
    //   return this.currentGroup * this.groupCount + 1;
    // },
    // startPage1() {
    //   //每组起始页
    //   return this.currentGroup1 * this.groupCount1 + 1;
    // },
    // groupCount1() {
    //   // 一组多少条
    //   return this.groupCount1 * this.value;
    // },
  },
  methods: {
    // pageChange1(newPage) {
    //   if (newPage === this.currentGroup1 * this.groupCount1) {xxxx
    //     newPage++;
    //   }
    //   this.currentPage1 = newPage;
    // },
    // handleChange1(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.currentGroup1 = 0;
    //   this.currentPage1 = 1;
    // },
    // beforeTip() {
    //   if (this.currentGroup == 0) {
    //     this.$message({ type: "warning", message: "当前组是第一组" });
    //     return;
    //   }
    //   this.currentGroup--;
    //   this.currentPage = this.currentGroup * this.groupCount + 1;
    // },
    // nextTip() {
    //   if (this.totalNum / this.groupCount < this.currentGroup + 2) {
    //     this.$message({ type: "warning", message: "当前组是最后一组" });
    //     return;
    //   }
    //   this.currentGroup++;
    //   console.log("当前组数：" + this.currentGroup);
    //   this.currentPage = this.currentGroup * this.groupCount + 1;
    //   // console.log(this.currentPage);
    // },
  },
};
</script>
<style scoped lang="scss">
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

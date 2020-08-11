<template>
  <div class="home">
    <wavesurfer></wavesurfer>
    <div class="pagination">
      <div>共{{ pageTotal }}页</div>
      <el-select
        v-model="value"
        placeholder="请选择"
        @change="handleChange"
        size="mini"
      >
        <el-option
          v-for="item in [10, 20, 50, 100]"
          :key="item"
          :label="`每页${item}条`"
          :value="item"
        >
        </el-option>
      </el-select>
      <elPage
        ref="elPag"
        :startPage="startPage"
        :currentPage="currentPage"
        :pagerCount="pagerCount"
        :pageCount="pageCount"
        :disabled="false"
        @change="pageChange"
      >
      </elPage>
      <div>当前第{{ nowZu + 1 }}组</div>
      <div class="prev" @click="beforeTip">上一组</div>
      <div class="next" @click="nextTip">下一组</div>
    </div>
    <div class="pagination">
      <div>共{{ pageTotal1 }}页</div>
      <el-select
        v-model="value1"
        placeholder="请选择"
        @change="handleChange1"
        size="mini"
      >
        <el-option
          v-for="item in [10, 20, 50, 100]"
          :key="item"
          :label="`每页${item}条`"
          :value="item"
        >
        </el-option>
      </el-select>
      <elPageCount
        ref="elPag"
        :startPage1="startPage1"
        :currentPage1="currentPage1"
        :pagerCount="pagerCount"
        :pageCount1="pageCount1"
        :disabled="false"
        @change="pageChange1"
      >
      </elPageCount>
      <div>当前第{{ nowZu1 + 1 }}组</div>
      <div class="prev" @click="beforeTip1">上一组</div>
      <div class="next" @click="nextTip1">下一组</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Wavesurfer from "@/views/Wavesurfer.vue";
import elPage from "./modules/elPage.vue";
import elPageCount from "./modules/elPageCount.vue";

export default {
  name: "Home",
  components: {
    Wavesurfer,
    elPage,
    elPageCount,
  },
  created() {
    const array = [1, 2, 3, 4, 5, 6];
    array.map((item) => {
      // console.log(item);
    });
  },
  computed: {
    pageCount() {
      //一组多少页
      return Math.ceil(this.zushu / this.value);
    },
    pageTotal() {
      //总页数
      return this.pageCount * (this.zongshu / this.zushu);
    },
    pageTotal1() {
      // 总页数
      return Math.ceil(this.zongshu / this.value1);
    },
    startPage() {
      //每组起始页
      return this.nowZu * this.pageCount + 1;
    },
    startPage1() {
      //每组起始页
      return this.nowZu1 * this.pageCount1 + 1;
    },
    zushu1() {
      // 一组多少条
      return this.pageCount1 * this.value;
    },
  },
  methods: {
    pageChange(newPage) {
      this.currentPage = newPage;
      // this.internalCurrentPage = this.getValidCurrentPage(newPage);
      // console.log(this.internalCurrentPage)
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    handleChange(val) {
      console.log(`每页 ${val} 条`);
      this.nowZu = 0;
      this.currentPage = 1;
    },
    pageChange1(newPage) {
      this.currentPage1 = newPage;
      // this.internalCurrentPage = this.getValidCurrentPage(newPage);
      // console.log(this.internalCurrentPage)
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    handleChange1(val) {
      console.log(`每页 ${val} 条`);
      this.nowZu1 = 0;
      this.currentPage1 = 1;
    },
    beforeTip() {
      if (this.nowZu == 0) {
        this.$message({ type: "warning", message: "当前组是第一组" });
        return;
      }
      this.nowZu--;
      this.currentPage = this.nowZu * this.pageCount + 1;
    },
    nextTip() {
      if (this.zongshu / this.zushu < this.nowZu + 2) {
        this.$message({ type: "warning", message: "当前组是最后一组" });
        return;
      }
      this.nowZu++;
      console.log("当前组数：" + this.nowZu);
      this.currentPage = this.nowZu * this.pageCount + 1;
      // console.log(this.currentPage);
    },
    beforeTip1() {
      if (this.nowZu1 == 0) {
        this.$message({ type: "warning", message: "当前组是第一组" });
        return;
      }
      this.nowZu1--;
      this.currentPage1 = this.nowZu1 * this.pageCount1 + 1;
    },
    nextTip1() {
      if (this.pageTotal1 / this.pageCount1 < this.nowZu1 + 2) {
        this.$message({ type: "warning", message: "当前组是最后一组" });
        return;
      }
      this.nowZu1++;
      console.log("当前组数：" + this.nowZu1);
      this.currentPage1 = this.nowZu1 * this.pageCount1 + 1;
      // console.log(this.currentPage);
    },
  },
  data() {
    return {
      currentPage: 1, //当前页
      currentPage1: 1,
      zongshu: 2000, //总条数
      value: 10, //一页多少条
      value1: 10, //一页多少条
      zushu: 500, //一组总条数
      nowZu: 0, //组数
      nowZu1: 0, //组数
      pagerCount: 7, //组件显示几页
      internalCurrentPage: 1,
      pageCount1: 20,
    };
  },
};
</script>
<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  div {
    margin: 0 10px;
    &.prev,
    &.next {
      cursor: pointer;
    }
  }
}
</style>

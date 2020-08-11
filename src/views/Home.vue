<template>
  <div class="home">
    <wavesurfer></wavesurfer>
    <div>共{{ pageTotal }}页</div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in [10, 20, 30, 40]"
        :key="item"
        :label="item"
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
    <span @click="beforeTip">上一组</span>
    <span @click="nextTip">下一组</span>
  </div>
</template>

<script>
// @ is an alias to /src
import Wavesurfer from "@/views/Wavesurfer.vue";
import elPage from "./modules/elPage.vue";

export default {
  name: "Home",
  components: {
    Wavesurfer,
    elPage,
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
      return Math.ceil(this.zongshu / this.value);
    },
    startPage() {
      //每组起始页
      return this.nowZu * this.pageCount + 1;
    },
  },
  methods: {
    pageChange(newPage) {
      this.currentPage = newPage;
      // this.internalCurrentPage = this.getValidCurrentPage(newPage);
      // console.log(this.internalCurrentPage)
    },
    getValidCurrentPage(value) {
      value = parseInt(value, 10);

      const havePageCount = typeof this.internalPageCount === 'number';

      let resetValue;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    beforeTip() {
      if (this.nowZu == 0) {
        return;
      }
      this.nowZu--;
      this.currentPage = this.nowZu * this.pageCount + 1;
    },
    nextTip() {
      if (this.zongshu / this.zushu < this.nowZu + 2) {
        return;
      }
      this.nowZu++;
      console.log('当前组数：'+this.nowZu);
      this.currentPage = this.nowZu * this.pageCount + 1;
      // console.log(this.currentPage);
    },
  },
  data() {
    return {
      currentPage: 1, //当前页
      currentPage1: 1,
      zongshu: 1000, //总台数
      value: 10, //一页多少条
      zushu: 100, //一组总条数
      nowZu: 0, //组数
      pagerCount: 7, //组件显示几页
      internalCurrentPage:1
    };
  },
};
</script>

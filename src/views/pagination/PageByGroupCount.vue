
<template>
  <div class="pagination">
    <div>共{{ totalNum }}条</div>
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
    <my-group-count
      ref="elPag"
      :startPage="startPage"
      :currentPage="currentPage"
      :pagerCount="pagerCount"
      :groupCount="groupCount"
      :disabled="false"
      @change="pageChange"
    >
    </my-group-count>
    <div>当前第{{ currentGroup + 1 }}组</div>
    <el-button type="primary" @click="changeGroup(-1)">上一组</el-button>
    <el-button type="primary" @click="changeGroup(1)">下一组</el-button>
  </div>
</template>

<script>
import MyGroupCount from "./GroupCount";
export default {
  components: {
    MyGroupCount,
  },
  data() {
    return {
      currentPage: 1, //当前页
      totalNum: 102, //总条数
      value: 10, //一页多少条
      groupCount: 10, //组数
      currentGroup: 0, //当前组数
      pagerCount: 7, //组件显示几页
    };
  },
  computed: {
    totalGroup() {
      return Math.ceil(this.totalNum / (this.value * this.groupCount));
    },
    startPage() {
      return this.groupCount * this.currentGroup + 1;
    },
  },
  methods: {
    changeGroup(value) {
      if (value === -1) {
        if (this.currentGroup == 0) {
          this.$message({ type: "warning", message: "当前组是第一组" });
          return;
        }
        this.currentGroup--;
      } else if (value === 1) {
        console.log(this.totalGroup, this.currentGroup);
        if (this.totalGroup < this.currentGroup + 2) {
          this.$message({ type: "warning", message: "当前组是最后一组" });
          return;
        }
        this.currentGroup++;
      }
      this.currentPage = this.currentGroup * this.groupCount + 1;
    },
    handleChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentGroup = 0;
      this.currentPage = 1;
    },
    pageChange(newPage) {
      if (newPage === this.currentGroup * this.groupCount) {
        newPage++;
      }
      this.currentPage = newPage;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>


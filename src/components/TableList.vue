<template>
  <div class="table">
    <el-table
      stripe
      style="width: 100%"
      height="100%"
      :data="tableData"
      v-loading="loadingData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="序号" width="55">
        <template #default="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>
      <!-- 遍历tableColumn列信息 -->
      <el-table-column
        v-for="item in tableColumn"
        :key="item['prop']"
        :prop="item['prop']"
        :label="item['label']"
        :width="item['width']"
        :align="item['align'] || 'center'"
        :formatter="item['formatter']"
      >
        <template #default="scope">
          <slot :column="scope" name="column"></slot>
        </template>
      </el-table-column>
      <!-- operation具名作用域插槽 -->
      <el-table-column label="操作" :width="columnOperation" key="operation">
        <template #default="scope">
          <slot :operation="scope" name="operation"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 15, 20, 25, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TableList",
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableColumn: {
      type: Array,
      default() {
        return [];
      },
    },
    totalNum: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    columnOperation: {
      type: Number,
      default: 180,
    },
    loadingData: Boolean,
  },
  methods: {
    handleSelectionChange(selection) {
      this.callingEmit("selection-change", selection);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.callingEmit("current-change", val);
    },
    handleEditDelete(operation) {
      console.log(this.findPrentEle(event.target, "tr.el-table__row"));
      this.tableData.splice(operation.$index, 1);
      this.callingEmit("edit-row-delete", operation);
    },
    callingEmit(emit, value, ...v) {
      if (this.$listeners[emit]) {
        this.$emit(emit, value, ...v);
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.$parent.currentPage = this.currentPage;
  },
};
</script>

<template>
  <div class="entity-relation">
    <table-list
      $index
      v2_0
      :table-column="tableColumn"
      :table-data="tableData"
      :total-table-num="totalTableNum"
      :page-size="pageSize"
      :loading-data="loadingData"
      @current-change="currentPageChange"
      @selection-change="handleSelectionChange"
      $selection
    >
      <template #operation="{ operation }">
        <el-button
          type="linear"
          class="success"
          @click="handleClickCheckToDetail(operation.row, 'labelReviewList')"
          >编辑</el-button
        >
        <el-button
          type="linear"
          class="primary"
          @click="handleClickAbandonORFinish(operation.row, 1)"
          >确认</el-button
        >
        <el-button
          type="linear"
          class="danger"
          @click="handleClickAbandonORFinish(operation.row, 0)"
          >删除</el-button
        >
      </template>
    </table-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [],
      tableData: [],
      totalTableNum: 0,
      pageSize: 10,
      loadingData: false,
    };
  },
  methods: {
    handleClickCheckToDetail() {},
    handleClickAbandonORFinish() {},
    currentPageChange() {},
    handleSelectionChange() {},
  },
};
</script>

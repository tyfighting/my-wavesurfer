<template>
  <div class="">
    <el-button @click="handleClickAdd" type="primary">新增</el-button>
    <table-list
      :columnOperation="180"
      :table-column="tableColumn"
      :table-data="tableData"
      :total-table-num="totalTableNum"
      :loadingData="loadingData"
      :page-size="pageSize"
      @edit-row-delete="handleEditDelete"
      @edit-row-save="handleEditSave"
      @current-change="handleCurrentChange"
      @select-change="handleSelectChange"
      @header-click="handleHeaderClick"
      editable
      ref="table-list"
    >
      <!-- </template> -->
      <!-- <label-manage-dialog
        ref="label-manage-dialog"
        :title="dialogTitle"
        :dynamic-tags="dynamicTags"
      ></label-manage-dialog> -->
    </table-list>
  </div>
</template>

<script>
import tableList from "@/components/TableListEdit";
import { tableListMixin } from "@/utils/mixin";
import { tableEdit } from "@/config/table";
export default {
  name: "tableEdit",
  components: {
    tableList,
  },
  mixins: [tableListMixin],
  data() {
    return {
      tableColumn: tableEdit,
    };
  },
  methods: {
    handleClickAdd() {
      this.$refs["table-list"].tableRowAdd();
    },
    handleEditDelete() {},
    handleEditSave() {},
    handleCurrentChange() {},
    handleSelectChange() {},
    handleHeaderClick() {},
  },
};
</script>

<style lang="less" scoped></style>

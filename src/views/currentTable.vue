<template>
  <div class="table">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="序号" width="55">
        <span slot-scope="scope">{{
          scope.$index + 1 + (currentPage - 1) * pageSize
        }}</span>
      </el-table-column>
      <el-table-column
        v-for="item in tableColumn"
        :key="item['prop']"
        :prop="item['prop']"
        :label="item['label']"
        :width="item['width']"
        align="center"
        :formatter="item['formatter']"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click="handleLook(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            type="danger"
            plain
            @click="handleDown(scope.$index, scope.row)"
            >下载</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 15, 20, 25, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>

<script>
import { tableMixin, downFileBlob } from "@/utils/mixin";
import { textHistory, downText } from "@/assets/api";
import { tableList } from "@/config/homeHistory.js";
export default {
  mixins: [tableMixin, downFileBlob],
  data() {
    return {
      tableColumn: tableList,
    };
  },
  created() {
    this.query();
  },
  methods: {
    async query() {
      this.loading = true;
      const selectList =
        this.$parent.selectValue === ""
          ? ["", ""]
          : this.$parent.selectValue.split("-");
      const data = await textHistory({
        fromTime: !this.$parent.value ? "" : this.$parent.value[0],
        toTime: !this.$parent.value ? "" : this.$parent.value[1],
        fromText: selectList[0],
        toText: selectList[1],
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      if (data.code && data.code === "1") {
        this.tableData = data.datas.list;
        this.totalNum = Number(data.datas.total);
      }
      this.loading = false;
    },
    async handleDown(index, row) {
      const response = await downText({ id: row.id });
      this.blobToFile(response);
    },
    handleLook(index, row) {
      this.$emit("show", row);
      this.$parent.$refs["history-show"].dialogFormVisible = true;
    },
    handleSelectionChange(val) {
      this.selectedArray = val;
    },
  },
};
</script>

<style lang="less" scoped></style>

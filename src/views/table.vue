<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- @cell-mouse-enter="handleEnter" @cell-mouse-leave="handleLeave" -->
      <el-table-column
        prop="date"
        label="时间"
        sortable
        width="240"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column prop="address" label="指令"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @mouseenter.native="handleEnter(scope.$index, scope.row)"
            @mouseleave="handleLeave(scope.$index, scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
    >
      <!-- close-on-click-modal
      close-on-press-escape -->
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [],
      tableData: [
        {
          id: 1,
          date: "2016-05-01 13:43:31.001",
          name: "王小虎",
          address: "指令1",
          children: [
            {
              id: 11,
              date: "2016-05-01 13:43:31.001",
              name: "王小虎",
              address: "指令1",
            },
            {
              id: 12,
              date: "2016-05-01 13:43:31.001",
              name: "王小虎",
              address: "指令1",
            },
          ],
        },
        {
          id: 2,
          date: "2016-05-01 13:43:31.001",
          name: "王小虎",
          address: "指令1",
          children: [
            {
              id: 21,
              date: "2016-05-01 13:43:31.001",
              name: "王小虎",
              address: "指令1",
            },
            {
              id: 22,
              date: "2016-05-01 13:43:31.001",
              name: "王小虎",
              address: "指令1",
            },
          ],
        },
        {
          id: 3,
          date: "2016-05-01 13:43:31.001",
          name: "王小虎",
          address: "指令1",
          children: [
            {
              id: 31,
              date: "2016-05-01 13:43:31.001",
              name: "王小虎",
              address: "指令1",
            },
            {
              id: 32,
              date: "2016-05-01 13:43:31.001",
              name: "王小虎",
              address: "指令1",
            },
          ],
        },
      ],
      totalTableNum: 0,
      pageSize: 10,
      loadingData: false,
      dialogVisible: false,
    };
  },
  methods: {
    handleEnter(index, row) {
      this.dialogVisible = true;
    },
    handleClose() {},
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-table {
  .el-table__row--level-1 {
    background: #f0f9eb;
  }
  .el-table__row--level-0 {
    background: oldlace;
  }
}
</style>

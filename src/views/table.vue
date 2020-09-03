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
      <el-table-column prop="date" label="时间" sortable width="240">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="指令"> </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
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
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
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

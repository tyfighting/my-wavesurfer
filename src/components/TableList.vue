<template>
  <div :class="[v2_0 ? 'table-wrapper-new' : 'table-wrapper']">
    <el-table
      ref="el-table"
      :data="tableData"
      style="width: 100%"
      :max-height="maxHeight"
      :row-class-name="tableRowClassName"
      :cell-style="cellStyle"
      header-row-class-name="row-shadow header-row"
      header-cell-class-name="cell-normal"
      cell-class-name="cell-normal"
      @header-click="handleHeaderClick"
      @selection-change="handleSelectionChange"
      border
      v-loading="loadingData"
    >
      <!-- 选择框-->
      <el-table-column
        v-if="$selection"
        type="selection"
        width="68"
        align="center"
      ></el-table-column>
      <!-- 索引-->
      <el-table-column v-if="$index" label="序号" width="68" align="center">
        <template #default="slotProps">
          {{ slotProps.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>
      <!-- 遍历tableColumn列信息 -->
      <el-table-column
        v-if="tableColumn && tableColumn.length > 0"
        v-for="item in tableColumn"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
        :width="item.width"
        :align="item.align || 'center'"
      >
      </el-table-column>
      <!-- operation具名作用域插槽 -->
      <el-table-column
        v-if="!!$scopedSlots.operation || editable"
        label="操作"
        :width="columnOperation"
        key="operation"
      >
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
      layout="total, prev, pager, next, jumper"
      :total="totalTableNum"
    >
    </el-pagination>
    <slot></slot>
    <t-shape :shape="TShape"></t-shape>
  </div>
</template>

<script>
export default {
  name: "TableList",
  data() {
    return {
      editStatus: 0,
      editIndex: 0,
      arithmeticType: "",
      arithmeticName: "",
      currentPage: 1,
    };
  },
  props: {
    v2_0: Boolean,
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
    $index: Boolean,
    $selection: Boolean,
    editable: Boolean,
    showPagination: {
      type: Boolean,
      default: true,
    },
    totalTableNum: {
      type: Number,
      default: 0,
    },
    cellStyle: Function,
    pageSize: {
      type: Number,
      default: 20,
    },
    columnOperation: {
      type: Number,
      default: 180,
    },
    TShape: {
      type: String,
      default: "tl,tr,bl,br,hls",
    },
    loadingData: Boolean,
    maxHeight: String,
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

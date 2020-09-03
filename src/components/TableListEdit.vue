<template>
  <!--    v2_0-->
  <div class="table-wrapper">
    <slot name="top"></slot>
    <!-- pagination 为否时 是前端分页 -->
    <el-table
      ref="el-table"
      :data="
        tableColumn.pagination === false
          ? tableData.slice(
              pageSize * (currentPage - 1),
              currentPage * pageSize
            )
          : tableData
      "
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
      <!-- 展开行-->
      <el-table-column v-if="$scopedSlots.expand" type="expand">
        <template v-slot:default="scope">
          <slot :expand="scope" name="expand"></slot>
        </template>
      </el-table-column>
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
        :sortable="item.sortable"
        :show-overflow-tooltip="item.showOverflowTooltip !== false"
        :formatter="item.formatter"
        :width="item.width"
        :align="item.align || 'center'"
      >
        <template v-if="item.slot" :slot="item.slot">
          {{ item.label }} <i class="el-icon-s-tools"></i>
        </template>
        <template v-if="editable" #default="slotProps">
          <template
            v-if="
              (editStatus === 1 ||
                (editStatus === 2 && item.editable !== false)) &&
                editIndex === slotProps.$index
            "
          >
            <el-input
              v-model="slotProps.row[item.prop]"
              custom
              v-if="item.ediType === 'input'"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            ></el-input>
            <el-select
              v-model="slotProps.row[item.prop]"
              custom
              v-else-if="item.ediType === 'select'"
              :multiple="item.multiple"
              @change="(_) => handleClickChange(_, item.prop)"
            >
              <el-option
                v-for="itemC in item.option"
                :key="itemC.value"
                :label="itemC.label"
                :value="itemC.value"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else>
            {{
              item.formatter
                ? item.formatter(
                    slotProps.row,
                    slotProps.column,
                    slotProps.row[item.prop],
                    slotProps.$index
                  )
                : slotProps.row[item.prop]
            }}
          </template>
        </template>
      </el-table-column>
      <!-- operation具名作用域插槽 -->
      <el-table-column
        v-if="!!$scopedSlots.operation || editable"
        label="操作"
        :width="columnOperation"
        key="operation"
      >
        <template v-slot:default="scope">
          <slot :operation="scope" name="operation"></slot>
          <template v-if="editable">
            <template v-if="editStatus && scope.$index === editIndex">
              <el-button
                type="linear"
                class="primary"
                @click="handleEditSave(scope)"
                >确定</el-button
              >
              <el-button
                type="linear"
                class="danger"
                @click="handleEditCancel(scope)"
                >取消</el-button
              >
            </template>
            <template v-else>
              <el-button
                type="linear"
                class="primary"
                @click="handleEditTable(scope)"
                :disabled="!!(editStatus && scope.$index !== editIndex)"
                >编辑</el-button
              >
              <el-button
                type="linear"
                class="danger"
                @click="handleEditDelete(scope)"
                :disabled="!!(editStatus && scope.$index !== editIndex)"
                >删除</el-button
              >
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalTableNum"
    >
    </el-pagination>
    <slot></slot>
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
    loadingData: Boolean,
    maxHeight: String,
  },
  methods: {
    setPropValue(prop, value) {
      this.tableData[this.editIndex][prop] = value;
    },
    handleClickChange(value, item) {
      const currColumn = this.tableColumn.find((cv) => cv.prop === item);
      const resultValue = currColumn.option.find((cv) => cv.value === value);
      // 编辑表格中，select发生变化
      this.callingEmit("select-change", resultValue, item, this.editIndex);
    },
    handleSelectionChange(selection) {
      this.callingEmit("selection-change", selection);
    },
    handleHeaderClick(column, event) {
      if (
        event.target.className.toLocaleLowerCase().includes("el-icon-s-tools")
      ) {
        this.$emit("header-click", {
          label: column.label,
          property: column.property,
        });
      }
    },
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 ? "row-shadow" : "row-normal";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.callingEmit("current-change", val);
    },
    tableRowAdd() {
      if (this.editStatus !== 1) {
        const result = this.tableColumn.reduce((ct, cv) => {
          ct[cv.prop] = "";
          return ct;
        }, {});
        console.log(result);
        // this.tableData.splice(0, 0, {})
        this.tableData.unshift(result);
        // 为1时新增状态
        this.editStatus = 1;
        this.editIndex = 0;
        this.$nextTick((_) => {
          document.querySelector(`.el-table__row:nth-child(1)`).style.cssText =
            ";transform: scale3d(1, 0, 1);";
          setTimeout(() => {
            document.querySelector(
              `.el-table__row:nth-child(1)`
            ).style.cssText =
              ";transform: scale3d(1, 1, 1); transition: transform 0.25s ease-in-out; transform-origin: top";
          }, 0);
        });
      }
    },
    handleEditSave(operation) {
      const editStatus = this.editStatus;
      this.editStatus = 0;
      this.callingEmit("edit-row-save", { operation, editStatus });
      this.editRow = undefined;
    },
    handleEditDelete(operation) {
      console.log(this.findPrentEle(event.target, "tr.el-table__row"));
      this.tableData.splice(operation.$index, 1);
      this.callingEmit("edit-row-delete", operation);
    },
    handleEditTable(operation) {
      // return false
      this.editIndex = operation.$index;
      const { ...editRow } = operation.row;
      // 暂存本行旧数据
      this.editRow = editRow;
      // 为2时编辑状态
      this.editStatus = 2;
    },
    handleEditCancel(operation) {
      // 为1时，新增状态取消操作
      if (this.editStatus === 1) {
        this.tableData.shift();
        // 为2时，编辑状态取消操作
      } else if (this.editStatus === 2) {
        console.log(this.editRow);
        this.tableData[operation.$index] = this.editRow;
      }
      this.editStatus = 0;
    },
    initTableStatus() {
      if (this.editRow) {
        this.tableData[this.editIndex] = this.editRow;
        this.editRow = undefined;
      } else if (this.editStatus === 1) {
        this.tableData.shift();
      }
      this.editStatus = 0;
      this.currentPage = 1;
    },
    findPrentEle(el, matches) {
      while (el && !el.matches(matches)) {
        el = el.parentElement;
      }
      return el;
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
    // console.log(this.$slots)
    // console.log(this.$scopedSlots)
  },
};
</script>

export const tableListMixin = {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      // 根据父级组件需要使用pageNum
      pageNum: 1,
      totalTableNum: 0,
      loadingData: false,
    };
  },
  methods: {
    changeCurrentPage(v) {
      this.pageNum = v;
      this.doTableDataQuery(v);
    },
    operationAlert({
      context,
      title = "确认信息",
      beforeClose: fn,
      confirmClose: ccFn,
    }) {
      this.$alert(context, title, {
        confirmButtonText: "确定",
        showClose: true,
        showCancelButton: true,
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            fn.then((res) => {
              done();
              instance.confirmButtonLoading = false;
            });
          } else {
            done();
          }
        },
        callback: (action) => {
          if (action !== "confirm") return false;
          ccFn instanceof Function && ccFn();
        },
      });
    },
  },
};
export const testMixin = {
  data() {
    return {
      msg: "hello!mixin",
    };
  },
  methods: {
    hello() {
      console.log("hello!mixin");
    },
  },
  created() {
    this.hello();
  },
};

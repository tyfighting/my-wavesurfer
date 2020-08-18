<template>
  <div class="menu-view">
    <p>1111</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="详细" name="menuDetail"></el-tab-pane>
      <el-tab-pane label="信息" name="menuInfo"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "menuView",
  data() {
    return {
      activeName: "menuDetail",
    };
  },
  methods: {
    handleClick(value) {
      console.log(this.activeName, value.name);
      // if (this.activeName !== value.name) {
      this.activeName = value.name;
      this.$router.push({ name: value.name });
      // }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm);
      vm.activeName = to.name === "menuView" ? "menuDetail" : to.name;
      if (to.name !== vm.activeName) {
        vm.$router.replace({ name: vm.activeName });
      }
    });
  },
};
</script>

<style lang="less" scoped></style>

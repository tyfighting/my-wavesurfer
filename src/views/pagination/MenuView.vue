<template>
  <div class="menu-view">
		<p>1111</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="详细" name="detail"></el-tab-pane>
      <el-tab-pane label="信息" name="info"></el-tab-pane>
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
      activeName: "detail",
    };
  },
  methods: {
    handleClick(value) {
      this.currentTab = value.name;
      this.$router.push({ name: value.name });
    },
  },
};
</script>

<style lang="less" scoped>
</style>

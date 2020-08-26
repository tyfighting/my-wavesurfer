<template>
  <div class="home">
    <el-col :span="3">
      <my-menu></my-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
import myMenu from "@/components/menu.vue";
export default {
  name: "Home",
  components: {
    myMenu,
  },
};
</script>
<style lang="scss" scoped>
.home,
.el-col-4 {
  height: 100%;
}
</style>

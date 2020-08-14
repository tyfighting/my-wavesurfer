<template>
  <div class="home">
    <el-col :span="4">
      <my-menu></my-menu>
    </el-col>
    <el-col :span="20">
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
  created() {
    const array = [1, 2, 3, 4, 5, 6];
    array.map((item) => {
      // console.log(item);
    });
  },
};
</script>
<style lang="scss" scoped>
.home,
.el-col-4 {
  height: 100%;
}
</style>

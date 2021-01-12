<template>
  <transition name="el-zoom-in-bottom">
    <div class="menu">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <el-switch
        v-model="isCollapse"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
      <el-menu
        :default-active="currentActive"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#666"
        @select="handleSelect"
        :collapse="isCollapse"
      >
        <template v-for="item in currentNavMenu">
          <el-submenu
            v-if="item['children']"
            :index="item['index']"
            :key="item['key']"
          >
            <template slot="title">
              <span :class="item['index']">{{ item["title"] }}</span>
            </template>
            <el-menu-item
              v-for="itemChildren in item['children']"
              :key="itemChildren['index']"
              :index="itemChildren['index']"
            >
              <span>{{ itemChildren["title"] }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else-if="!item['children']"
            :index="item['index']"
            :key="item['key']"
          >
            <!-- <i class="el-icon-menu"></i> -->
            <span slot="title" :class="item['index']">{{ item["title"] }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </transition>
</template>

<script>
import navMenu from "@/config/navMenu";
export default {
  data() {
    return {
      currentActive: "",
      currentNavMenu: navMenu,
      isCollapse: false,
    };
  },
  created() {
    const $routeName = this.$route.name;
    this.currentActive = $routeName.includes("menu") ? "menuView" : $routeName;
  },
  methods: {
    handleSelect(key, path) {
      if (key !== this.$route.name) {
        this.$router.push({ name: key });
      }
    },
  },
  watch: {
    $route(value) {
      console.log(value);
      this.currentActive = value.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-menu,
.menu {
  height: 100%;
  /deep/.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>

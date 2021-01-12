<template>
  <div>
    <div class="item">
      <p>navigation-link：</p>
      <navigation-link url="/profile">
        <span class="fa fa-user"></span>
        Your Profile {{ url }}
      </navigation-link>
    </div>
    <div class="item">
      <p>base-layout：</p>
      <base-layout>
        <template #header>
          <h1>Here might be a page title</h1>
        </template>
        <template #default>
          <p>A paragraph for the main content.</p>
          <p>And another one.</p>
        </template>
        <template #footer>
          <p>Here's some contact info</p>
        </template>
      </base-layout>
    </div>
    <div class="item">
      <p>current-user：</p>
      <current-user #default="user">{{ user }}</current-user>
    </div>
  </div>
</template>

<script>
import navigationLink from "@/components/mySlot/navigationLink.vue";
import baseLayout from "@/components/mySlot/baseLayout.vue";
import currentUser from "@/components/mySlot/currentUser.vue";
export default {
  name: "mySlot",
  data() {
    return {
      url: "/url",
    };
  },
  components: {
    navigationLink,
    baseLayout,
    currentUser,
  },
};
</script>

<style lang="scss" scoped>
.item {
  text-align: left;
  padding: 20px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.17);
  margin-bottom: 20px;
  border-radius: 8px;
}
</style>

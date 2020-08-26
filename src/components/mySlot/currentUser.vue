<template>
  <div>
    <slot :user="user">{{ user.lastName }}</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        lastName: "lastName",
        firstName: "firstName",
      },
    };
  },
};
</script>

<style lang="less" scoped></style>

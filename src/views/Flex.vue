<template>
  <div>
    <div class="flex">{{ msg }}</div>
    <input type="file" @change="handleChange" ref="file" />
  </div>
</template>

<script>
import { testMixin } from "@/utils/mixin";
export default {
  mixins: [testMixin],
  data() {
    return {
      msg: "hello!self",
    };
  },
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log("hello!self,method");
    },
    handleChange() {
      console.log("change");
      const file = this.$refs["file"];
      console.log(file.files);
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="editor-wrapper">
    <div id="editor"></div>
    <el-button @click="getHtml"></el-button>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    init() {
      this.editor = new E("#editor");
      this.editor.config.height = 500;
      this.editor.config.uploadImgServer = "/upload-img";
      this.editor.create();
    },
    getHtml() {
      console.log(this.editor.txt.html());
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.editor-wrapper {
  width: 100%;
  height: 500px;
}
</style>

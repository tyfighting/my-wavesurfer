<template>
  <div class="music">
    <el-button type="primary" @click="setTimer">开始</el-button>
    <el-button type="primary" @click="clearTimer">停止</el-button>
    <el-button type="primary" @click="handleZoom(1)">放大</el-button>
    <el-button type="primary" @click="handleZoom(-1)">缩小</el-button>
    <el-button type="primary" @click="handleReplace">替换</el-button>
    <div class="music-wrapper">
      <div class="music-content">
        <p
          v-for="(item, index) in time"
          :key="index"
          :class="{ active: statusArr[index] }"
          @click="handleClick(index)"
        >
          {{ item }}---{{ currentContent[index] }}--{{ statusArr[index] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { content, time } from "@/config/music.js";
export default {
  name: "music",
  data() {
    return {
      content: content,
      time: time,
      statusArr: [],
      timer: null,
      currentTime: 0,
      currentIndex: 0,
    };
  },
  computed: {
    currentContent() {
      let content = this.content;
      content = content.split("\n\n");
      return content;
    },
  },
  watch: {
    currentIndex() {
      const parent = document.querySelector(".music-wrapper");
      const child = document.querySelector(".music-content");
      const musicContent = [...document.querySelectorAll(".music-content p")];
      //计算每行的高度加上margin-top，并存到数组，不带单位
      let contentHeight = musicContent.map((item) => item.clientHeight + 10);
      //取前n个元素的高度加上margin-top之和
      let currentHeightArr = contentHeight.slice(0, this.currentIndex);
      let currentHeight = currentHeightArr.reduce((a, b) => a + b);
      console.log(contentHeight, currentHeightArr, currentHeight);
      if (parent.scrollTop >= child.scrollHeight) {
        parent.scrollTop = 10;
      } else {
        parent.scrollTop = currentHeight + 10;
      }
    },
  },
  methods: {
    setTimer() {
      this.clearTimer();
      this.currentIndex = 0;
      this.currentTime = 0;
      this.timer = setInterval(this.updateCurrent, 1000);
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    handleClick(index) {
      this.clearTimer();
      this.currentIndex = index;
      this.currentTime = Number(this.time[index].split(" ")[0]);
      this.timer = setInterval(this.updateCurrent, 1000);
    },
    updateCurrent() {
      this.statusArr = this.currentContent.map((item) => {
        return false;
      });
      const currentIndex = [];
      this.time.forEach((item, index) => {
        const time = item.split(" ");
        const start = Number(time[0]);
        const end = Number(time[1]);
        if (start <= this.currentTime && this.currentTime <= end) {
          this.$set(this.statusArr, index, true);
          currentIndex.push(index);
          // console.log(time, start, end, this.statusArr[index], index);
        }
      });
      // console.log(currentIndex);
      this.currentIndex =
        currentIndex.length === 0 ? this.currentIndex : currentIndex[0];
      this.currentTime++;
      if (this.time[this.time.length - 1].split(" ")[1] < this.currentTime) {
        this.clearTimer();
      }
    },
    handleZoom(value) {
      const musicContent = document.querySelectorAll(".music-content p");
      const fontSize = parseFloat(
        window.getComputedStyle(musicContent[0]).fontSize
      );
      if (parseInt(fontSize) >= 26 && value === 1) {
        this.$message({ type: "warning", message: "不能再放大了" });
      } else if (parseInt(fontSize) <= 12 && value === -1) {
        this.$message({ type: "warning", message: "不能再缩小了" });
      }
      musicContent.forEach((item) => {
        item.style.fontSize = fontSize + value * 2 + "px";
      });
    },
    handleReplace() {
      const array = [1, 2, 3, 4, 5, 6];
      array.map((item) => {
        // console.log(item);
      });
      let arr = [
        '下面的示例"The" 替换为单词 "A" 的用法。下面的示例"The" 替换为单词 "A" 的用法',
        '下面的示例"The" 替换为单词 "A" 的用法。下面的示例"The" 替换为单词 "A" 的用法。',
      ];
      let key = ["示例", "单词"];
      arr.map((item) => {
        key.forEach((key) => {
          const reg = new RegExp(key, "g");
          item = item.replace(reg, `<span>${key}</span>`);
          console.log(reg, key, item);
        });
        return item;
      });
    },
  },
  created() {
    this.statusArr = this.currentContent.map((item) => {
      return false;
    });
  },
  mounted() {
    this.setTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
};
</script>

<style lang="scss" scoped>
.music-wrapper {
  height: 200px;
  overflow-y: auto;
  margin: 20px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.17);
  .music-content {
    padding: 10px 30px;
    text-align: left;
    p {
      margin: 10px 0;
      cursor: pointer;
    }
    .active {
      background-image: linear-gradient(to bottom right, #7dbdff, #3486da);
    }
  }
}
</style>

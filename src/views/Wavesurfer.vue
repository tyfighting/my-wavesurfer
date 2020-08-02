<template>
  <div>
    <div class="wavesurfer" v-loading="loading">
      <div ref="wavesurfer"></div>
      <div id="timeline"></div>
      <div id="region"></div>
    </div>
    <div>
      <p>左声道：{{ leftChannle }}</p>
      <p>右声道：{{ rightChannle }}</p>
    </div>
    <div class="operate">
      <el-button type="primary">{{ currentTime }}</el-button>
      <el-button type="primary" @click="changeChannel(1)">左声道</el-button>
      <el-button type="primary" @click="changeChannel(2)">右声道</el-button>
      <el-button type="primary" @click="changeChannel(0)">正常播放</el-button>
      <el-button type="primary" @click="handlePause">暂停</el-button>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js";
export default {
  name: "wavesurfer",
  data() {
    return {
      loading: true,
      wavesurfer: null,
      currentTime: 0,
      publicPath: process.env.BASE_URL,
      leftChannle: [
        { start: 10, end: 20 },
        { start: 40, end: 50 },
        { start: 90, end: 100 }
      ],
      rightChannle: [
        { start: 30, end: 40 },
        { start: 60, end: 70 },
        { start: 100, end: 120 }
      ],
      leftFlag: 0, //左声道播放到第几个
      rightFlag: 0, //右声道播放到第几个
      type: 0
    };
  },
  mounted() {
    this.initWavesurfer();
  },
  methods: {
    initWavesurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: this.$refs.wavesurfer,
        waveColor: "violet",
        progressColor: "purple",
        plugins: [
          // 光标插件
          Regions.create({
            container: "#region"
          }),
          // 时间轴插件
          Timeline.create({
            container: "#timeline"
          })
        ]
      });
      this.wavesurfer.load(this.publicPath + "video/demo.mp3");
      this.wavesurfer.on("ready", () => {
        this.loading = false;
        this.wavesurfer.addRegion({
          id: "region",
          start: 0,
          end: this.wavesurfer.getDuration(),
          loop: false,
          drag: false,
          resize: true,
          color: "rgba(254, 255, 255, 0.4)"
        });
      });
      this.wavesurfer.on("audioprocess", value => {
        this.currentTime = parseInt(value);
        if (this.type === 1) {
          if (this.currentTime == this.leftChannle[this.leftFlag]["end"]) {
            if (this.leftFlag == this.leftChannle.length - 1) {
              this.wavesurfer.pause();
              return;
            }
            this.leftFlag++;
            this.wavesurfer.play(this.leftChannle[this.leftFlag]["start"]);
          }
        } else if (this.type === 2) {
          if (this.currentTime == this.rightChannle[this.rightFlag]["end"]) {
            if (this.rightFlag == this.rightChannle.length - 1) {
              this.wavesurfer.pause();
              return;
            }
            this.rightFlag++;
            this.wavesurfer.play(this.rightChannle[this.rightFlag]["start"]);
          }
        }
      });
    },
    handlePause() {
      this.wavesurfer.playPause();
    },
    changeChannel(value) {
      this.leftFlag = 0;
      this.rightFlag = 0;
      this.type = value;
      if (value === 0) {
        this.currentTime = 0;
        this.wavesurfer.play(0);
      } else if (value === 1) {
        // 左声道
        const start = this.leftChannle[this.leftFlag]["start"];
        this.currentTime = start;
        this.wavesurfer.play(start);
      } else if (value === 2) {
        // 右声道
        const start = this.rightChannle[this.rightFlag]["start"];
        this.currentTime = start;
        this.wavesurfer.play(start);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wavesurfer {
  box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.17);
  margin-bottom: 20px;
  padding: 20px;
}
</style>

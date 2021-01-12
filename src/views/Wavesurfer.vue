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
      <el-button type="primary" @click="handleCut()">剪切</el-button>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js";
import { content } from "@/config/music.js";
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
        { start: 90, end: 100 },
      ],
      rightChannle: [
        { start: 30, end: 40 },
        { start: 60, end: 70 },
        { start: 100, end: 120 },
      ],

      // 方式一：
      left_data: null,
      left_zeros: null,
      right_data: null,
      right_zeros: null,

      // leftGain: "",
      // rightGain: "",
      // stateLeft: 1,
      // stateRight: 1,
    };
  },
  created() {
    // fetch("/audio/lesson/shi0529/0008/8163/rule1.mp3", {
    //   mode: "no-cors",
    // }).then((res) => {
    //   console.log(res);
    // });
  },
  mounted() {
    this.initWavesurfer();
  },
  methods: {
    async initWavesurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: this.$refs.wavesurfer,
        waveColor: "violet",
        progressColor: "purple",
        fillParent: true,
        splitChannels: true,
        plugins: [
          // 光标插件
          Regions.create({
            container: "#region",
          }),
          // 时间轴插件
          Timeline.create({
            container: "#timeline",
          }),
        ],
      });
      this.wavesurfer.load(this.publicPath + "video/03403.wav");
      // const res = await fetch("/audio/lesson/shi0529/0008/8163/rule1.mp3" );
      // console.log(res);
      // this.wavesurfer.load("/audio/lesson/shi0529/0008/8163/rule2.mp3");
      this.wavesurfer.on("ready", () => {
        this.loading = false;
        this.wavesurfer.addRegion({
          id: "region",
          start: 0,
          end: this.wavesurfer.getDuration(),
          loop: false,
          drag: false,
          resize: true,
          color: "rgba(254, 255, 255, 0.4)",
        });

        // 方式一：
        this.left_data = this.wavesurfer.backend.buffer
          .getChannelData(0)
          .map((d) => {
            return d;
          });
        this.left_zeros = this.left_data.map((d) => {
          return 0;
        });
        this.right_data = this.wavesurfer.backend.buffer
          .getChannelData(1)
          .map((d) => {
            return d;
          });
        this.right_zeros = this.right_data.map((d) => {
          return 0;
        });
        console.log("ready", this.wavesurfer.backend.buffer.numberOfChannels);
        this.wavesurfer.regions.list.region.update({ start: 10 });
        this.wavesurfer.regions.list.region.update({ end: 100 });
        // // 方式二：
        // const splitter = this.wavesurfer.backend.ac.createChannelSplitter(2);
        // console.log(splitter);
        // const merger = this.wavesurfer.backend.ac.createChannelMerger(2);
        // this.leftGain = this.wavesurfer.backend.ac.createGain();
        // this.rightGain = this.wavesurfer.backend.ac.createGain();
        // splitter.connect(this.leftGain, 0);
        // splitter.connect(this.rightGain, 1);
        // this.leftGain.connect(merger, 0, 0);
        // this.rightGain.connect(merger, 0, 1);
        // this.wavesurfer.backend.setFilters([splitter, this.leftGain, merger]);
      });
      this.wavesurfer.on("audioprocess", (value) => {
        this.currentTime = parseInt(value);
      });
    },
    handlePause() {
      this.wavesurfer.playPause();
    },
    handleCut() {
      var originalBuffer = this.wavesurfer.backend.buffer;
      console.log(originalBuffer);
      var emptySegment = this.wavesurfer.backend.ac.createBuffer(
        originalBuffer.numberOfChannels,
        originalBuffer.length,
        originalBuffer.sampleRate
      );
      for (var i = 0; i < originalBuffer.numberOfChannels; i++) {
        var chanData = originalBuffer.getChannelData(i);
        var segmentChanData = emptySegment.getChannelData(i);
        for (var j = 0, len = chanData.length; j < len; j++) {
          segmentChanData[j] = chanData[j];
        }
      }
      console.log(emptySegment);
    },
    handleCut1() {
      const instance = this.wavesurfer;
      const selection = instance.regions.list.region;
      console.log(selection);
      let original_buffer = instance.backend.buffer;
      let new_buffer = instance.backend.ac.createBuffer(
        original_buffer.numberOfChannels,
        original_buffer.length,
        original_buffer.sampleRate
      );

      const first_list_index = selection.start * original_buffer.sampleRate;
      const second_list_index = selection.end * original_buffer.sampleRate;
      const second_list_mem_alloc =
        original_buffer.length - selection.end * original_buffer.sampleRate;

      const new_list = new Float32Array(parseInt(first_list_index));
      const second_list = new Float32Array(parseInt(second_list_mem_alloc));
      let combined = new Float32Array(original_buffer.length);

      original_buffer.copyFromChannel(new_list, 0);
      original_buffer.copyFromChannel(second_list, 0, second_list_index);

      combined.set(new_list);
      combined.set(second_list, first_list_index);

      new_buffer.copyToChannel(combined, 0);

      instance.loadDecodedBuffer(new_buffer);
      // selection.end = selection.start;
      selection.update({ end: selection.start });
    },
    changeChannel(value) {
      if (value === 0) {
        this.currentTime = 0;
        this.wavesurfer.play();

        //方式一：
        this.wavesurfer.backend.buffer.copyToChannel(this.left_data, 1);
        this.wavesurfer.backend.buffer.copyToChannel(this.right_data, 1);
        // console.log("双声道");
      } else if (value === 1) {
        // 左声道
        this.wavesurfer.play();

        // 方式一：
        this.wavesurfer.backend.buffer.copyToChannel(this.left_data, 0);
        this.wavesurfer.backend.buffer.copyToChannel(this.right_zeros, 1);
        console.log("左声道");

        // if (this.stateLeft == 1) this.stateLeft = 0;
        // else this.stateLeft = 1;
        // this.leftGain.gain.value = this.stateLeft;
      } else if (value === 2) {
        // // 右声道
        this.wavesurfer.play();

        // 方式一：
        this.wavesurfer.backend.buffer.copyToChannel(this.left_zeros, 0);
        this.wavesurfer.backend.buffer.copyToChannel(this.right_data, 1);
        console.log("右声道");

        // if (this.stateRight == 1) this.stateRight = 0;
        // else this.stateRight = 1;
        // this.rightGain.gain.value = this.stateRight;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wavesurfer {
  box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.17);
  margin-bottom: 20px;
  padding: 20px;
}
</style>
